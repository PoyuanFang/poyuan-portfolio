export interface Skill {
  _key: string;
  name: string;
  level: number;
}

export interface SkillSet {
  _id: string;
  title: string;
  skills: Skill[];
}
