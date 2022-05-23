import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  /**
   * "serializeUser is called when the user object is serialized into the session, and is passed the
   * user object and a callback function."
   *
   * The user object is serialized into the session, and is passed the user object and a callback
   * function
   * @param {any} user - The user object that was serialized and put into the session.
   * @param done - A callback that is called once the user is serialized.
   */
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }

  /**
   * The deserializeUser function is called by passport.session() to get the user object from the user
   * id stored in the session
   * @param {any} payload - The payload from the JWT
   * @param done - A callback that is called once the user is deserialized.
   */
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
