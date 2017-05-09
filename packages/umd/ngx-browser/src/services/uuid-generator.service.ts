
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable()
export class UUIDGenerator {
  constructor() {

  }

  generateV1() {
    return uuid.v1();
  }

  generateV4() {
    return uuid.v4();
  }
}
