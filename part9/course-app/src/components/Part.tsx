import type { CoursePart } from "../types";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <strong>{coursePart.name} ({coursePart.exerciseCount})</strong>
          <div><em>{coursePart.description}</em></div>
        </div>
      );

    case "group":
      return (
        <div>
          <strong>{coursePart.name} ({coursePart.exerciseCount})</strong>
          <div>Project exercises {coursePart.groupProjectCount}</div>
        </div>
      );

    case "background":
      return (
        <div>
          <strong>{coursePart.name} ({coursePart.exerciseCount})</strong>
          <div><em>{coursePart.description}</em></div>
          <div>Background material: <a href={coursePart.backgroundMaterial}>{coursePart.backgroundMaterial}</a></div>
        </div>
      );

    case "special":
      return (
        <div>
          <strong>{coursePart.name} ({coursePart.exerciseCount})</strong>
          <div><em>{coursePart.description}</em></div>
          <div>Requirements: {coursePart.requirements.join(", ")}</div>
        </div>
      );

    default:
      {
        const _exhaustiveCheck: never = coursePart;
        return _exhaustiveCheck;
      }
  }
};

export default Part;
