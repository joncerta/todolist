import { signup } from '../../controllers/auth';

describe('Testing taskById ', function() {
it('Should error out if no inputTime was provided', async function() {
  const expressJwt = {
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
  }
    await signup(req,res);
    expect(res.statusCode).to.equal(400)
  });
})