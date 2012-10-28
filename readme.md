# HOP
## A version of Make (or Ruby Rake or Coffeescript Cake or Javascript Jake) for Dart.

# Goals

* Allow easy task generation in Dart.
* Allow easy task reuse by referencing packages.
* Support command completion on command line (Bash currently supported)

# Setup

* **Must** define a file `tools/hop_runner.dart` realative to the root of
the project.
    * This file must import the default hop library and define a main to be executed.
    * This file should add one or more task using `addTask` and `addAsyncTask`.

```dart
#import('package:hop/hop.dart');

void main() {
  addTask('normal_task', _myNormalTask);
  addAsyncTask('async_task', _myAsyncTask);
  runHopCore();
}

bool _myNormalTask(TaskContext context) {
  context.fine('Print out messages using context');
  return true; // on success
}

Future<bool> _myAsyncTask(TaskContext content) {
  // You'll want to do something more interesting here, but Futures are supported.
  return new Future.immediate(true);
}
```

* **Must** define a runner for hop, normally named `hop`.
    * Option 1: copy `bin/hop` from the hop project into the root of your project.
    * Option 2: copy or create a symbolic link to `bin/hop` in your path
* **Optional** (but really nice): _source_ `tool/hop-completion.bash` to enable
    command completion in bash.

# Usage

### See a list of commands
`hop`

```text
Welcome to HOP

Tasks:
test
about
docs
```

### Execute a command

`hop [command_name]`

### Auto-complete command (if enabled)

`hop [tab]`

# Future

* Allow task paramaters
* Allow easy task nesting: tasks within tasks, tasks depending on tasks, etc.

# Versioning

Our goal is to follow [Semantic Versioning](http://semver.org/).

_Note: we have not released v1 (yet)._

# Authors
 * [Kevin Moore](https://github.com/kevmoo) ([@kevmoo](http://twitter.com/kevmoo))
 * _You? File bugs. Fork and Fix bugs. Let's build this community._

## [The BSD 2-Clause License](http://www.opensource.org/licenses/bsd-license.php)

    Copyright (c) 2012, The HOP project authors
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
