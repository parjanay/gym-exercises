import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import { exerciseOptions } from '../utils/fetchData';
import { fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';
const SearchExercises = (setExercises, bodyPart, setBodyPart) => {
    let s_Exercises = setExercises.setExercises;
    let body_part = setExercises.bodyPart;
    let s_BodyPart = setExercises.setBodyPart;

    setExercises = s_Exercises;
    bodyPart = body_part;
    setBodyPart = s_BodyPart;

    const [search, setSearch] = useState('');
    const [bodyParts, setbodyParts] = useState([]);
    const delay=(ms)=>new Promise(res=>setTimeout(res,ms));
    

    useEffect(()=>{
        const fetchExerciseData = async()=>{
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
            delay(15000);
            bodyPartsData.push('all');
            setbodyParts(bodyPartsData);
            
        }
        fetchExerciseData();
    },[]);

    

    const handleSearch = async() =>{
        if(search){
            const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
            const searchedExercises = exerciseData.filter(
                (exercise) => 
                exercise.name.toLowerCase().includes(search) ||
                exercise.target.toLowerCase().includes(search) ||
                exercise.equipment.toLowerCase().includes(search) ||
                exercise.bodyPart.toLowerCase().includes(search)
            );
            window.scrollTo({top:1800, left:100, behavior:"smooth"});
            delay(15000);
            setSearch('');
            setExercises(searchedExercises);
        }
    };

    console.log("BodyParts: "+bodyParts);
    debugger;
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
        <Typography fontWeight={700} sx={{fontSize:{lg:"44px", xs:"30px"}}} mb="50px" textAlign="center">
            Awesome Exercises You <br/> Should Know
        </Typography>
        <Box position="relative" mb="72px">
            <TextField 
            sx={{
                input: {fontWeight:'700', border: "none", borderRadius: "4px"},
                width: {lg:'800px', xs:'350px'},
                backgroundColor: "#fff",
                borderRadius: "40px"
            }}
            height="76px" 
            value={search}
            onChange={(e)=>{setSearch(e.target.value.toLowerCase())}}
            placeholder="Search Exercises"
            type="text"
            />
            <Button onClick={handleSearch} className="search-btn" sx={{bgcolor: "#ff2625", color:"#fff", textTransform:"none", width:{lg: "175px", xs: "80px"}, fontSize:{lg: "20px", xs: "14px" }, height: "56px", position: "absolute", right:"0" }}>
                Search
            </Button>
        </Box>
        <Box sx={{position:'relative', width:'100%', p:'20px'}}>
            <HorizontalScrollbar data={bodyParts} isBodyParts bodyPart={bodyPart} setBodyPart={setBodyPart}/>
        </Box>
    </Stack>
  )
}

export default SearchExercises