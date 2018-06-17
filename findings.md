# Identified Issues

On this page I try to list the issues that came up whilst developing emanzip.at.
It should list learnings and point to some discussions that already took place on the webz.
It should also explain why certain ideas that come to light whenever I talk to people about the idea of emanzip.at won't make it into the source code of emanzip.at.

## url storage

* usability troublesome:
* browser-bookmarks
* sharing the link
* local browser-history

## character encoding

The w3c [recommends using UTF-8](https://www.w3.org/International/questions/qa-choosing-encodings).
TextEncoder and TextDecoder droped support for UTF-16 ([Chrome](https://www.chromestatus.com/feature/5630760492990464), [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1257877)).
Both interfaces are [currently not supported by IE](https://caniuse.com/#feat=textencoder) (June 2018).
The unicode project is based on a [consortium](https://www.unicode.org/consortium/consort.html) that decides which characters will be included in the unicode standard.
It is an example for a human centered consus algorithm for character mapping.
The existence of problems within this algorithm ([Emojigeddon, Wired article](https://www.wired.com/beyond-the-beyond/2016/04/web-semantics-emojigeddon/), [Medium article](https://medium.com/@maggieshafer/unicode-a-story-of-corruption-connection-and-smiling-poo-598295e4af9d), [Ars Technica Article about the rifle emoji](https://arstechnica.com/gadgets/2016/08/emoji-are-getting-ever-more-expressive-but-not-without-growing-pains/)) are now (2018) obvious:

* For linguists unicode is just one way to [universally exchange corpus data](http://martinweisser.org/corpora_site/unicode_n_ipa.html).
* many of the [Mojikyo (文字鏡 Mojikyō)](http://www.mojikyo.org/) characters are not included in unicode

Language and encoding thereof is a regional and a personal matter.
Digital communications between humans always has specific encoding requirements:

* both partners have to agree to use the same enconding
* be technically able to en- and decode the binary data
* be sure the transport does no falsy en- or decodings

So the argument stands:

It is a personal decision which character encoding I want to use.
Being forced by some browser engine to use UTF-8 might not be a problem for the western world, but it certainly also restricts us in our ability to express ourself.

Unfortunately, as browser engines took this decision away from us, we are not free here, and as emanzip.at is based on the browser, because it seems to be ubiquitous, we are forced to use UTF-8 for the time being ☹