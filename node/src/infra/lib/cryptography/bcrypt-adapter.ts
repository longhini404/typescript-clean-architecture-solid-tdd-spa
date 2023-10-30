import bcrypt from 'bcrypt'
import { Hash, HashCompare } from '@/data/protocols/cryptography'

export class BcryptAdapter implements HashCompare {
  async compare(params: HashCompare.Params): Promise<HashCompare.Result> {
    return bcrypt.compare(params.incoming_password, params.storaged_password)
  }

  async hash(params: Hash.Params): Promise<Hash.Result> {
    return bcrypt.hash(params.password, 8)
  }
}
