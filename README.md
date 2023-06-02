# Generator Z

This extension provides a quick way to generate templates directly into your project either by using the command palette or by right clicking on the directory you want to create the template.

## Generating React Component

Just right click on the directory you want to create the component and select the option `Generate React Component`, now select one of the following options:

- Generate React Component: This generates a basic React Component.
- Generate React Component with memo: This generates a React Component with memo.
- Generate React Component with forwardRef: This generates a React Component with forwardRef.
- Generate React Component with memo and forwardRef: This generates a React Component with memo and forwardRef.

> Please note that all generated components are created in a folder with index.ts file thus you may add more sub components to that component.

In the near future, I will add more options to generate other templates.

## Generating Http Services

Most apps requires API connection, by using [Mongez Http](https://github.com/hassanzohdy/mongez-http) you can easily manage your API requests, this dropdown contins two options:

- `Generate Client Service File (Mongez)`: This generates a basic Http Service with two functions: `getXList` which may recieve an object for params to list data, and `getX` which recieves the id of the item you want to get.
- `Generate Restful Service (Mongez): This generates a restful endpoint class, which automaitcally provides you with `list`, `get`, `create`, `update`, and `delete` functions based on the given route.

> The first prompot asks for the service file name, second prompt asks for the route, if left blank, then it will be generated from the given service file name.

> The Third prompt asks for the base endpoint file loction, the endpoint object must be exported as defult from tht path, defaults to `shared/endpoint`.

## Release Notes

- V3 (31 May 2023)
    - Generate Rect Component now is a dropdown.
    - Added Generate Rect Component with memo.
    - Added Generate Rect Component with forwardRef.
    - Added Generate Rect Component with memo and forwardRef.
    - Http Services are now dropdown.
- V2 (27 May 2023)
    - Added `Generate CLient Service File` command.
    - Added `Generate Restful Service File` command.
- V1 (25 May 2023)
    - Added Generate React Component.