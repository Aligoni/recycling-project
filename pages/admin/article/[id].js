import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { server } from '../../../constants/server';
import { AuthContext } from "../../../components/context/auth-context";
import CircularProgress from '@mui/material/CircularProgress';
import parse from 'html-react-parser'

const Article = () => {
	
	const router = useRouter();
	const authContext = useContext(AuthContext);

	const [loading, setLoading] = useState(true);
	const [article, setArticle] = useState();
	
	useEffect(() => {
		if (!authContext.isUserAuthenticated()) {
			router.push('/admin');
			return;
		}
		
		const getData = async () => {
			try {
				const article = await axios.get(`${server}/articles/${router.query.id}`);

				console.log(article.data);
				
				if (article.status == 200) {
					setArticle(article.data.data);
				}
				
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		getData();
	}, []);

	return (
		<div className='w-[90%] max-w-7xl mx-auto my-8'>
			<div>
				<p className='text-4xl cursor-pointer' onClick={() => router.push('/admin/dashboard')}>&larr;</p>
			</div>
			{
				loading ? <div className='my-8 w-full h-80 flex justify-center items-center'><CircularProgress className='text-black' /></div> : (
					<>
						<div className='w-full h-80'>
							<img className={'w-full h-full object-contain'} src={article.image} />
						</div>
						<p className='text-lg text-gray-500'>Author: {article.admin.firstname} {article.admin.lastname}</p>
						<h1 className='text-4xl text-center my-4'>{article.title}</h1>
						<p>{parse(article.content)}</p>
					</>
				)
			}
		</div>
	)
}

export default Article;