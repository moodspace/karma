# Karma

This is a Node.js command line utility that provides a web frontend to display files in a directory. It is a perfect way to serve and manage static files.

## Design and inspiration

Based on [martinaglv's cute-files explorer](https://github.com/martinaglv/cute-files).

**Features:**

* Material design UI.
* One-click preview.
* Instant file search.
* Easy to config and use.

## Install

```bash
git clone https://github.com/moodspace/karma.git
```

## Usage

Once installed, change the port, root alias, and directory prefix in karma.js,
and run `karma` from CLI.

### Examples

Make the current folder available on `<yourip>:15595` on the local network:

```bash
karma
```

You can specify the port. Make the current folder available on `<yourip>:12345`
on the local network:

```bash
karma --port 12345
```

### Notes

Files starting with a dot are assumed to be private and are not served.
