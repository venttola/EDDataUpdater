define({ "api": [
  {
    "type": "get",
    "url": "api/ships/",
    "title": "Get list of all ships",
    "name": "GetShipListing",
    "group": "Ships",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "ships",
            "description": "<p>List of the ships</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/ships.ts",
    "groupTitle": "Ships"
  },
  {
    "type": "post",
    "url": "api/ships/",
    "title": "Send corrected ship data",
    "name": "SendCorrection",
    "group": "Ships",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "station",
            "description": "<p>Station name</p>"
          },
          {
            "group": "Parameter",
            "type": "List",
            "optional": false,
            "field": "ships",
            "description": "<p>List of ships available</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/ships.ts",
    "groupTitle": "Ships"
  },
  {
    "type": "get",
    "url": "api/system/:name",
    "title": "Check system name validity",
    "name": "CheckSystemValidity",
    "group": "System",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>System name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "nearestNeighbours",
            "description": "<p>List of the nearest systems</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "SystemNotFound",
            "description": "<p>System was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/system.ts",
    "groupTitle": "System"
  }
] });
