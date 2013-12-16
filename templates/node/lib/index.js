var client = require('./{{call .Fnc.camelizeDownFirst .Pkg.name}}/http_client');

// Export module
var {{call .Fnc.camelizeDownFirst .Pkg.name}} = module.exports;

/**
 * This file contains the global namespace for the module
 */
{{call .Fnc.camelizeDownFirst .Pkg.name}}.client = function(auth, options) {
  return new Client(auth, options);
};

/**
 * Assign all the api classes
 */{{with $data := .}}{{range .Api.classes}}
{{call $data.Fnc.camelizeDownFirst $data.Pkg.name}}.{{call $data.Fnc.camelize .}} = require('./{{call $data.Fnc.camelizeDownFirst $data.Pkg.name}}/api/{{call $data.Fnc.camelizeDownFirst .}}');{{end}}{{end}}

/**
 * Main client for the module
 */
var Client = function(auth, options) {
  this.httpClient = new client.HttpClient(auth, options);

  return this;
};
{{with $data := .}}{{range .Api.classes}}
/**
 * {{index $data.Doc . "desc"}}
 *{{with $class := .}}{{range $index, $element := (index $data.Doc $class "args")}}
 * @param ${{index $data.Api.class $class "args" $index}} {{.}}{{end}}{{end}}
 */
Client.prototype.{{call $data.Fnc.camelizeDownFirst .}} = function ({{call $data.Fnc.args.node (index $data.Api.class . "args") true}}) {
    return new {{call $data.Fnc.camelizeDownFirst $data.Pkg.name}}.{{call $data.Fnc.camelize .}}({{call $data.Fnc.args.node (index $data.Api.class . "args")}}this.httpClient);
};
{{end}}{{end}}