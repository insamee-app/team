import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import School from 'App/Models/School'

export default class SchoolPolicy extends BasePolicy {
	public async viewList(user: User) {}
	public async view(user: User, school: School) {}
	public async create(user: User) {}
	public async update(user: User, school: School) {}
	public async delete(user: User, school: School) {}
}
