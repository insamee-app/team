import School from 'App/Models/School'

export function getSchoolByHost(hostname: string): Promise<School | null> {
  return School.query().where('hostname', hostname).first()
}
