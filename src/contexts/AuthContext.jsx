import { login, register } from 'api/auth';
import { createContext, useState } from 'react';
import * as jwt from 'jsonwebtoken';

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

//1. createContext
const AuthContext = createContext(defaultAuthContext);
