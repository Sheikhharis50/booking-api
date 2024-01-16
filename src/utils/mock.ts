import { MiddlewareConsumer } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { NestApplication } from '@nestjs/core';

/**
 * The `mockMiddleware` function configures middleware for specified routes in a Nest application.
 * @param {NestApplication} app - The `app` parameter is an instance of the `NestApplication` class. It
 * represents the Nest.js application that the middleware will be applied to.
 * @param {any} module - The `module` parameter is the module class or token that you want to configure
 * the middleware for. It is used to retrieve the module instance from the Nest application container
 * using the `app.get()` method.
 * @param {any} middleware - The `middleware` parameter is the middleware function that you want to
 * apply to the specified routes. Middleware functions are functions that have access to the request
 * and response objects, and can modify them or perform additional actions before passing control to
 * the next middleware function or the route handler.
 * @param {RouteInfo[]} routes - The `routes` parameter is an array of `RouteInfo` objects. Each
 * `RouteInfo` object represents a route in the application and contains information such as the HTTP
 * method (GET, POST, etc.) and the route path.
 */
export const mockMiddleware = async (
  app: NestApplication,
  module: any,
  middleware: any,
  ...routes: RouteInfo[]
) => {
  const appModule = app.get(module);
  appModule.configure = function (consumer: MiddlewareConsumer) {
    consumer.apply(middleware).forRoutes(...routes);
  };
};
