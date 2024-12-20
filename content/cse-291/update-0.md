+++
title = "CSE 291 Project Update 0"
date = 2024-10-29
draft = false
unlisted = true
summary = "This week's efforts were directed towards strengthening the field accessors generated by svd2rust for PACs."
+++

This week's efforts were directed towards strengthening the field
accessors generated by [svd2rust](https://github.com/rust-embedded/svd2rust) for PACs.

An important principle proposed as part of proto-hal is the notion that type-states
uphold the following rules:
1. Directly represent register field value
1. Sole means of modifying registers

The previous design of the `write` and `modify` register methods forbode arbitrary
closure return values.

Typical usages looked like:

```rust
p.PREIPH.reg().write(|w| {
    w.some_flag()
        .set_bit()
        .other_field().
        .baked_in_state()
});
```

Field accessors were chainable because they propagated the `Writer`.

For convenience, the signature of `write` and `modify` required the return
of the `Writer`. This blocked other values from being returned.

This prevented the second rule listed above from being implemented.

Here is a minimal example of a type-state trait:

```rust
trait State {
    fn set(w: &mut pac::periph::reg::FIELD_W) -> Self;
}
```

Usage in a peripheral abstraction:

```rust
impl<S1, S2, ..> Peripheral<S1, S2, ..>
where
    S1: State,
    S2: State,
    ..
{
    fn freeze<NewS1, NewS2, ..>(self) -> Peripheral<NewS1, NewS2..>
    where
        NewS1: State,
        NewS2: State,
        ..
    {
        let (s1, s2, ..) = self.rb.reg().write(|w| {
            (
                NewS1::set(w.some_field()),
                NewS2::set(w.other_field()),
                ..
            )
        })

        Self {
            s1,
            s2,
            ..
        }
    }
}
```

This incredibly robust pattern was not possible given that the register
accessor (`write`) did not permit returning these type-state instances.

To fix this, we proposed the addition of new accessor methods to enable this usage.

The new signature:

```rust
pub fn from_write<F, T>(&self, f: F) -> T // return the T...
where
    F: FnOnce(&mut W<REG>) -> T, // ...returned by the closure
{
    // {implementation}
}
```

A simple change, really, but a crucial one.

We raised [this](https://github.com/rust-embedded/svd2rust/issues/859) issue,
which prompted [this](https://github.com/rust-embedded/svd2rust/pull/873) discussion and
[this](https://github.com/rust-embedded/wg/discussions/800#discussioncomment-11020573) meeting item,
ultimately resulting in [this](https://github.com/rust-embedded/svd2rust/pull/874) PR which was
merged shortly after the meeting.

## Next Up

Our next goal is changing the svd2rust field type generation schema.

As of now, field writer types are aliases to a public `FieldWriter` with many generics.

This is bad because signatures accepting generic field writers (for type-states which
apply to multiple fields) cannot enforce proper alignment nor width.

Additionally, offset is stored as a member rather than a generic constant, which
introduces runtime overhead and fallibility.

This is, of course, unacceptable.

We are pursuing multiple solutions.
