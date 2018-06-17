## initialized

created new random uuid4 compliant to
https://www.ietf.org/rfc/rfc4122.txt and initialized it with a UrlSilo

The UrlSilo stores all data in the URL.

## loaded

loaded existing emanzip.at data from url and used silo-renderer to
generate html.

## updated

existing silo data has been updated (either silo initialization
configuration or silo data).

## silo.invalid

the silo could not be initialized, because the data sent via url is not
compliant with the current emanzip.at data structure:

    {
        // data required by EmanzipatInitializer to create a silo
        "d": {
            "v": 0,          // Emanzipat data version
            "id": "0",       // a globally unique ID for your silo
            "l": "freeText"  // name of the silo loader
        },
        // data required by a silo to manage and render the data
        "s": {
            "s": "url",                 // name of storage backend
            "d": "拜托, chänge moi (:"  // arbitrary data
        }
    }

## silo.noStorageBackend



## silo.version

It is possible that you have an old silo lying around somewhere and try to load it with the current version of emanzip.at.
That does not work, because I am a single developer, and I currently can not provide the resources to implement the migration use case.
However, no worries, the silos data is not lost and I am working on a "way-back-machine".

## urlStorage.noData

the UrlStorage was initialized with an invalid settings-json-object. Make
sure the UrlStorage is initialized with an object looking like this:

    {
        "d": "<b>some</b> html"
    }