import School from 'App/Models/School'

export function getSchoolByHost(host: string): Promise<School | null> {
  return School.query().where('host', host).first()
}
