import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Box} from '@mui/material'
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
const ExerciseDetail = () => {
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setequipmentExercises] = useState([]);
    const {id} = useParams();
    const delay =(ms)=>new Promise(res=>setTimeout(res,ms));
    useEffect(()=>{
        const fetchExercisesData = async()=>{
          const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
          const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
          const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
          const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${encodeURI(exerciseDetailData.name)}`, youtubeOptions);
          const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
          const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
          delay(15000);
          setExerciseVideos(exerciseVideosData);
          setExerciseDetail(exerciseDetailData);
          setTargetMuscleExercises(targetMuscleExercisesData);
          setequipmentExercises(equipmentExercisesData);
        } 
        fetchExercisesData();
        
    }  
    ,[id]);
    console.log("exerciseDetail: "+exerciseDetail);
    console.log("exerciseVideos: "+exerciseVideos);
  return (
    <Box>

        <Detail exerciseDetail={exerciseDetail}/>
        <ExerciseVideos exerciseVideos={exerciseVideos.contents} name={exerciseDetail.name}/>
        <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
    </Box>
  )
}

export default ExerciseDetail