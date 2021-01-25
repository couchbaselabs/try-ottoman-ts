import express from 'express';

export type ControllerType = {
    router: express.Router;
    path: string;
};
