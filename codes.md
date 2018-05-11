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
            "v": 0,     // Emanzipat data version
            "id": "0",  // a globally unique ID for your silo
            "l": "url"  // name of the silo handler
        },
        // data required by a silo to render the data
        "s": {
            "d": "拜托, chänge moi (:"
        }
    }

## urlSilo.noData

the UrlSilo was initialized with an invalid settings-json-object. Make
sure the UrlSilo is initialized with an object looking like this:

    {
        "d": "<b>some</b> html"
    }