const Document = require('./Document');
const { isEmpty } = require('lodash'); 

module.exports = class DocumentBuilder {
    document = new Document();

    /**
    * API Title
    * @param {string} _title - The title of the application.
    * @returns {DocumentBuilder}
    */
    title(_title) {
        this.document.info.title = _title;
        return this;
    }

    /**
    * API Description
    * @param {string} _description - The description of the application.
    * @returns {DocumentBuilder}
    */
    description(_description) {
        this.document.info.description = _description;
        return this;
    }

    /**
    * API Version
    * @param {string} _version - The version of the application.
    * @returns {DocumentBuilder} - this
    */
    version(_version) {
        this.document.info.version = _version;
        return this;
    }

    /**
    * Terms of Service
    * @param {string} _termsOfService - A URL to the Terms of Service for the API.
    * @returns {DocumentBuilder} - this
    */
    termsOfService(_termsOfService) {
        this.document.info.termsOfService = _termsOfService;
        return this;
    }

    /**
    * Additional external documentation for this operation.
    * @param {string} description - A description of the target documentation.
    * @param {string} url - REQUIRED. The URL for the target documentation.
    * @returns {DocumentBuilder} - this
    */
    externalDoc(description, url) {
        this.document.externalDocs = { description, url }
        return this;
    }

    /**
    * Information to a target server.
    * @param {string} description - A description of the server.
    * @param {string} url - The URL for the target server.
    * @returns {DocumentBuilder} - this
    */
    addServer(url, description = "") {
        this.document.servers.push({ url, description });
        return this;
    }

    /**
    * Api Tag.
    * @param {string} name - REQUIRED. The name of the tag.
    * @param {string} description - A description for the tag.
    * @param {Object} externalDocs - Additional external documentation for this tag.
    * @param {string} externalDocs.url - REQUIRED. The URL for the target documentation.
    * @param {string} externalDocs.description - A description of the target documentation.
    * @returns {DocumentBuilder} - this
    */
    addTag(name, description = "", externalDocs = {}) {
        if(isEmpty(externalDocs)) {
            this.document.tags.push({ name, description });
        } else {
            this.document.tags.push({ name, description, externalDocs});
        }
       
        return this;
    }

    /**
    * Defines a security scheme that can be used by the operations.
    * @param {string} name - The name of the scheme.
    * @param {Object} securityOptions - The options of the scheme.
    * @param {'apiKey' | 'http' | 'oauth2' | 'openIdConnect'} securityOptions.type
    * @param {string} securityOptions.description
    * @param {string} securityOptions.name
    * @param {'query' | 'header' | 'cookie'} securityOptions.in
    * @param {string} securityOptions.scheme
    * @param {string} securityOptions.bearerFormat
    * @param {string} securityOptions.openIdConnectUrl
    * @returns {DocumentBuilder} - this
    */
    addSecurity(name, securityOptions) {
        this.document.components.securitySchemes = {
            ...(this.document.components.securitySchemes || {}),
            [name]: securityOptions
        }

        return this;
    }

    /**
    * Build the document.
    * @returns {Document}
    */
    build() {
        return this.document;
    }
}
