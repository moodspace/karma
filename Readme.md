# Karma

This is a node.js command line utility that turns the current working directory into a pretty online file browser, available to all computers in the local network. It is an easy way to share a folder with your office buddies.

## Design and inspiration

It is based on [martinaglv's cute-files explorer](https://github.com/martinaglv/cute-files).

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

Make the current folder available on `<yourip>:3000` on the local network:

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
