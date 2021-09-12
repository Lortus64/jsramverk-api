# Editor api

Editor api a api that connects with the editor frontend. The api hadel calls for getting, updating and editing files.

## Usage

```
import foobar

# returns a json with all the id and names in the database
GET/listNames

# Depending on the post data this route can do two things.
# If the post data has id it creates a file in the database that contains name and content.
# If the post data has id it will update the file with the posted name and content
# returns statuse
POST/update

# Post id
# returns the file with the posted id
POST/listOne
```