import metaData from '../../package.json';

export default () => ({
  /*
    |--------------------------------------------------------------------------
    | Application Meta Data
    |--------------------------------------------------------------------------
    |
    | This values are defined in the package.json.
    |
    */
  name: metaData.name,
  description: metaData.description,
  version: metaData.version,

  /*
    |--------------------------------------------------------------------------
    | Application Port
    |--------------------------------------------------------------------------
    |
    | This value define on witch port the application is available. Default is
    | the standard port 8000
    |
    */
  port: parseInt(process.env.PORT, 10) || 8000,

  /*
    |--------------------------------------------------------------------------
    | Base URL
    |--------------------------------------------------------------------------
    |
    | This value defines the url to our api server.
    |
    */
  baseUrl: process.env.BASE_URL || 'http://localhost:8000',
});
