#!bash
#
# bash completion script for Dart 'hop'
# https://github.com/kevmoo/hop.dart
#
# This script assumes hop.dart/bin/hop is in your path
#

_hop() 
{
  local cur prev opts
  COMPREPLY=()
  cur="${COMP_WORDS[COMP_CWORD]}"
  opts=`hop print_raw_task_list`

  if [[ ${cur} == -* || ${COMP_CWORD} -eq 1 ]] ; then
      COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
      return 0
  fi
}
complete -F _hop hop
