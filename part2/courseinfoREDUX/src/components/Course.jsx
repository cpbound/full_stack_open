const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
};

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((part) => <Part part={part} key={part.id} />);
};

const Total = ({ parts }) => {
  return (
    <h3>
      Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}
    </h3>
  );
};

export default Course;
