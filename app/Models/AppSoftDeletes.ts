import { compose } from '@ioc:Adonis/Core/Helpers'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class AppSoftDeletes extends compose(BaseModel, SoftDeletes) {}
