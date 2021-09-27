---
layout: article
title:  Crystal and The Test Command
date:   2021-09-24 20:06:02
categories: crystal
tags: crystal, bash, shell script, test
comments: true
path: /crystal-and-the-test-command
excerpt:
  When writing shell script, there's <strong>test</strong>, a condition evaluation utility. Crystal is a power programming language, that supports all <strong>test</strong> features.<br />
    What if we are porting a shell script to crystal, and we want to verify the correspondent command quickly? Check this article/cheatsheet and discover everything you need.
media:
  type: image
  source: posts_crystal_bash_test
  alt: montage with bash logo, crystal logo and test text
  caption: having fun with crystal and shell script
---

# Crystal and The Test Command

One of the most common commands on the terminal is `-f file && command`; it checks if the file exists and runs the command if it does. Do you know it's the `test`? A _condition evaluation utility_ according to its manual page.

Whoever wrote a shell script had used it a lot with its brackets to evaluate expressions, a useful utility, a complete tool belt to check files - on UNIX, almost everything is represented as a file, block device, terminals, sockets - directories, and much more.

Lately, playing with Crystal to configure my local machine, I was converting a few bash scripts and thought: _is there anything like `test` to help me with this conversion_? Sadly, I couldn't find it.

If you are reading this, you had better luck than me. Below is an extensive list (in the same order as the manual), with all test options and respective Crystal commands as one-liners. Okay, a few are two lines because I wanted to clarify in the variable name what that value is, but you can use it as a one-liner.

I hope you enjoy it 😄

## Cheatsheet

### -b file
True if file exists and is a block special file.
```ruby
File.info("/dev/disk0").type.block_device?
```

### -c file
True if file exists and is a character special file.
```ruby
File.info("/dev/console").type.character_device?
```

### -d file
True if file exists and is a directory.
```ruby
File.info("/dev").type.directory?
```

### -e file
True if file exists (regardless of type).
```ruby
File.exists?("/dev")
```

### -f file
True if file exists and is a regular file.
```ruby
File.file?("/etc/passwd")
```

### -g file
True if file exists and its set group ID flag is set.
```ruby
File.info("./sgid_file").flags.includes?(File::Flags::SetGroup)
```

### -h file
True if file exists and is a symbolic link.  This operator is retained for compatibility with previous versions of this program.  Do not rely on its existence; use -L instead.
```ruby
File.symlink?("linkz")
```

### -k file
True if file exists and its sticky bit is set.
```ruby
File.info("sticky_bit_file").flags.includes?(File::Flags::Sticky)
```

### -n string
True if the length of string is nonzero.
```ruby
"a".size > 0
```

### -p file
True if file is a named pipe (FIFO).
```ruby
File.info("fifo_file").type.pipe?
```

### -r file
True if file exists and is readable.
```ruby
File.readable?("readable")
```

### -s file
True if file exists and has a size greater than zero.
```ruby
File.size("foo.sh") > 0
```

### -t file_descriptor
True if the file whose file descriptor number is file_descriptor is open and is associated with a terminal.
It doesn't apply

### -u file
True if file exists and its set user ID flag is set.
```ruby
File.info("./suid_file").flags.includes?(File::Flags::SetUser)
```

### -w file
True if file exists and is writable.  True indicates only that the write flag is on.  The file is not writable on a read-only file system even if this test indicates true.
```ruby
File.writable?("./writable")
```

### -x file
True if file exists and is executable.  True indicates only that the execute flag is on.  If file is a directory, true indicates that file can be searched.
```ruby
File.executable?("./foo.sh")
```

### -z string
True if the length of string is zero.
```ruby
"".size == 0
```

### -L file
True if file exists and is a symbolic link.
```ruby
File.symlink?("linkz")
```

### -O file
True if file exists and its owner matches the effective user id of this process.
```ruby
current_user_id = `id -u`.chomp

File.info("foo.sh").owner_id == current_user_id
```

### -G file
True if file exists and its group matches the effective group id of this process.
current_group_id = `id -g`.chomp
```ruby
File.info("foo.sh").group_id == current_group_id
```

### -S file
True if file exists and is a socket.
```ruby
File.info(socket_file).type.socket?
```

### file1 -nt file2
True if file1 exists and is newer than file2.
```ruby
File.info(newer_file).modification_time > File.info(older_file).modification_time
```

### file1 -ot file2
True if file1 exists and is older than file2.
```ruby
File.info(older_file).modification_time < File.info(newer_file).modification_time
```

### file1 -ef file2
True if file1 and file2 exist and refer to the same file.
Given on manual it specifies:

If file is a symbolic link, test will fully dereference it and then evaluate the expression against the file referenced, except for the -h and -L primaries.
```ruby
File.same?("foo.sh", "linkz", follow_symlinks: true) # So we need to follow symlinks
```

### string
True if string is not the null string.
```ruby
str = ""
!str.nil? # true

str = nil
!str.nil? # false
```

### s1 = s2
True if the strings s1 and s2 are identical.
```ruby
str1 == str2
```

### s1 != s2
True if the strings s1 and s2 are not identical.
```ruby
str1 != str2
```

### s1 (less than) s2

True if string s1 comes before s2 based on the binary value of their characters.
```ruby
str1 < str2
```

### s1 > s2
True if string s1 comes after s2 based on the binary value of their characters.
```ruby
str1 > str2
```

### n1 -eq n2
True if the integers n1 and n2 are algebraically equal.
```ruby
1 == 2
```

### n1 -ne n2
True if the integers n1 and n2 are not algebraically equal.
```ruby
1 != 2
```

### n1 -gt n2
True if the integer n1 is algebraically greater than the integer n2.
```ruby
1 > 2
```

### n1 -ge n2
True if the integer n1 is algebraically greater than or equal to the integer n2.
```ruby
2 > 2
```

### n1 -lt n2
True if the integer n1 is algebraically less than the integer n2.
```ruby
1 < 2
```

### n1 -le n2
True if the integer n1 is algebraically less than or equal to the integer n2.
```ruby
2 < 2
```

Are you still reading it? Yes, sadly, this is the end. At least now you are ready to have some fun with shell script and crystal 😁👍
