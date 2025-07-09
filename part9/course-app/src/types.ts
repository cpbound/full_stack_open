  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    kind: string
  }

  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartSpecial extends CoursePartDescription {
    kind: "special",
    requirements: string[]
  }

  export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
