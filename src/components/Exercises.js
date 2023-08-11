import React,{useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import {Box, Stack, Typography} from '@mui/material';
import {exerciseOptions, fetchData} from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({exercises, setExercises, bodyPart}) => {
    const [currentPage, setcurrentPage] = useState(1);
    const delay=(ms)=>new Promise(res=>setTimeout(res,ms));
    const exercisesPerPage = 9;
    const indexOfLastExercise = currentPage*exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise-exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise,indexOfLastExercise);

    const paginate = (e, value)=>{
        setcurrentPage(value);
        window.scrollTo({top:1800, behavior:"smooth"})
    }
    useEffect(()=>{
        const fetchExercisesData = async()=>{
            let exercisesData = [];
            if(bodyPart ==='all'){
                exercisesData= await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions)
            }else{
                exercisesData=await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,exerciseOptions);
            }
            setExercises(exercisesData);
            await delay(5000);
        } 
        fetchExercisesData();  
    },[bodyPart]);
    return (
    <Box id="exercises" mt="50px" p="20px" sx={{mt:{lg:"110px"}}}>
        <Typography variant="h3" mb="46px">
            Showing Results
        </Typography>
        <Stack flexWrap="wrap" justifyContent ="center" direction="row" sx={{gap:{lg: '110px', xs: '50px'}}}>
            {currentExercises.map((exercise, index)=>(
                <ExerciseCard key={index} exercise={exercise}/>
            ))}
        </Stack>
        <Stack mt="100px" alignItems="center">
            {exercises.length >9 &&(
                <Pagination 
                    color="standard" 
                    shape="rounded" 
                    defaultPage={1} 
                    count={Math.ceil(exercises.length/exercisesPerPage)}
                    page={currentPage}
                    onChange={paginate}
                    size="large"
                />
            )}
        </Stack>
    </Box>
  )
}

export default Exercises