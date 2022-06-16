const pageData = async () => {
    try {
      const url = 'https://api.hatchways.io/assessment/students'
      const response = await fetch(url);
        if (response.ok) {
          const jsonResponse = await response.json();
          const students = await jsonResponse.students;
          return students;
        }
    } catch (error) {
      console.log(error);
    }
  }

//get the promised results 
pageData().then((students)=>{
    console.table(students)
    for(let i = 0; i < students.length; i++) {
        const student = students[i];
        //html here
        student.grades.forEach(grade => console.log(grade));
        
    }
});