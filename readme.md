![BOT!](https://raw.github.com/kevmoo/bot.dart/master/resource/logo.png)
# The Dart Bag-of-Tricks
## A collection of (mostly) general libraries to make working with [Dart](http://www.dartlang.org/) more productive.

Starting by porting bits of the [PL javascript library](https://github.com/thinkpixellab/pl) and Google's [Closure javascript library](https://developers.google.com/closure/library/) to enable some interesting scenarios.

[![](https://drone.io/kevmoo/bot.dart/status.png)](https://drone.io/kevmoo/bot.dart/latest)

# Highlights

## bot -- default library
 * __color__
     * `RgbColor`, `HslColor` with associated conversions back and forth
     * `RgbColor` supports to/from hex
 * __math__
     * `Coordinate`, `Box`, `Size`, `Vector`, `AffineTransfrom`
 * __property__
     * A general model for supporting runtime-defined properties supported objects.
     * This functionality is inspired by the Dependency Property model in WPF/Silverlight.

## async
  * `FutureValue`: an abstract model for async conversions via `Future<T>`
  * `SendPortValue`: an implementation of `FutureValue` using isolates.

## html

## qr

## retained

## test

# Versioning

Our goal is to follow [Semantic Versioning](http://semver.org/).

_Note: we have not released v1 (yet)._

# Authors
 * [Kevin Moore](https://github.com/kevmoo) ([@kevmoo](http://twitter.com/kevmoo))
 * [Andreas Köberle](https://github.com/eskimoblood) ([@eskimobloood](https://twitter.com/eskimobloood))
 * _You? File bugs. Fork and Fix bugs. Let's build this community._

## [The BSD 2-Clause License](http://www.opensource.org/licenses/bsd-license.php)

    Copyright (c) 2012, The Dart Bag-of-Tricks project authors
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this
       list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
    ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

    The views and conclusions contained in the software and documentation are those
    of the authors and should not be interpreted as representing official policies,
    either expressed or implied, of the FreeBSD Project.
