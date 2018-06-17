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

Recommended read by W3C before reading on: [Character encodings: Essential concepts](https://www.w3.org/International/articles/definitions-characters/) (basically explains how binary data gets translated to a character on your device like why '1100001' translates to 'a').

The w3c [recommends using UTF-8](https://www.w3.org/International/questions/qa-choosing-encodings).
TextEncoder and TextDecoder droped support for UTF-16 ([Chrome](https://www.chromestatus.com/feature/5630760492990464), [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1257877)).
Both interfaces are [currently not supported by IE](https://caniuse.com/#feat=textencoder) (June 2018).
The unicode project is based on a [consortium](https://www.unicode.org/consortium/consort.html) that decides which characters will be included in the unicode standard.
*It is an example for a collective consus algorithm for character mapping.*
The existence of problems within this algorithm are now (2018) obvious:

* [Emojigeddon, Wired article](https://www.wired.com/beyond-the-beyond/2016/04/web-semantics-emojigeddon/)
* [The Unicode Story, Medium article](https://medium.com/@maggieshafer/unicode-a-story-of-corruption-connection-and-smiling-poo-598295e4af9d)
* [Rifle Emoji, Ars Technica Article](https://arstechnica.com/gadgets/2016/08/emoji-are-getting-ever-more-expressive-but-not-without-growing-pains/)) 
* For linguists unicode is just one way to [universally exchange corpus data](http://martinweisser.org/corpora_site/unicode_n_ipa.html).
* many of the [Mojikyo (文字鏡 Mojikyō)](http://www.mojikyo.org/) characters are not included in unicode

Thus, language and encoding thereof is a regional and a personal matter.
Digital communications between humans always has specific encoding requirements:

* both partners have to agree to use the same enconding
* be technically able to en- and decode the binary data (know the mapping)
* be sure the transport does no falsy en- or decodings (trust in transport, no data corruption)

So the argument stands:

It is a personal decision which character encoding I want to use.
Being forced by some browser engine to use UTF-8 might not be a problem for the western world, but it certainly also restricts us in our ability to express ourself.

Unfortunately, as browser engines took this decision away from us, we are not free here, and as emanzip.at is based on the browser, because it seems to be ubiquitous, we are forced to use UTF-8 for the time being ☹

## Naming: storage vs usability

* URL Silo vs LocalStorage Silo is the wrong way as it promotes the storage engine but not the use case
* Free Text Silo is better because it focuses more on what a user can expect from the silo

## Naming: silo vs bubble

* it has been argued, that "bubble" is a better word than "silo"
* imho a bubble can emerge, wether a silo is conciously created
* imho a bubble seems universal, wether a silo is exclusive
* imho the web is an ocean of web urls that you as an individual can surf
* every web page containing information that you only can understand by entering the web page and reading it
* some can be discovered using search engines
* some can be visited because somebody told you about them
* some require technical (software, like Tor) equipment to be able to reach them
* ultimately, most of the time, its sheer luck that you know some page
* most of the time you don't know all the content on that page
* most of the time its a question of if you are in or out
* imho that metaphor is better described by a "silo" than a "bubble"
* again: my main argument is, that a silo is human made, designed by humans, behavior inside the silo is controlled by humans or algorithms that humans decided on, wheras a bubble has more emergent properties.