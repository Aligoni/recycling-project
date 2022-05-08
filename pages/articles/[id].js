import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { server } from '../../constants/server';
import CircularProgress from '@mui/material/CircularProgress';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import parse from 'html-react-parser';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ReactTimeAgo from 'react-time-ago'

const ArticleInfo = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const likedArticles = localStorage.getItem('liked_articles');
                if (likedArticles) {
                    const theLikedArticles = JSON.parse(likedArticles);
                    theLikedArticles.map(article => {
                        if (article == router.query.id) {
                            setLiked(true);
                        }
                    })
                }

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
    }, [router.query.id]);

    const likeArticle = async () => {
        if (liked) return;
        try {
            setLiked(true);
            const likedArticle = await axios.put(`${server}/articles/like/${router.query.id}`);
            console.log(likedArticle.data);
            if (likedArticle.status == 200) {
                const allLikedArticles = localStorage.getItem('liked_articles');
                if (!allLikedArticles) {
                    const newLikedArticles = [router.query.id];
                    const jsonLikedArticles = JSON.stringify(newLikedArticles);
                    localStorage.setItem('liked_articles', jsonLikedArticles);
                } else {
                    const theLikedArticles = JSON.parse(allLikedArticles);
                    theLikedArticles.push(router.query.id);
                    localStorage.setItem('liked_articles', JSON.stringify(theLikedArticles));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar nothome={true} />
            {
                loading? <div className='my-8 w-full h-80 flex justify-center items-center'><CircularProgress className='text-black' /></div> : (
                    <div className='my-8 w-[90%] max-w-6xl mx-auto text-xl'>
                        <p className='text-3xl cursor-pointer' onClick={() => router.back()} >&larr;</p>
                        <div className='w-full h-80'>
                            <img src={article?.image} className='w-full h-full object-contain' />
                        </div>
                        <div className="flex justify-between">
						    <p className='text-lg text-gray-500'>Author: {article?.admin.firstname} {article?.admin.lastname}</p>
                            <p className='text-sm text-gray-500'>
                                <i>{article?<ReactTimeAgo date={new Date(article?.createdAt).getTime()} />: ""}</i>
                            </p>
                        </div>
						<h1 className='text-4xl text-center my-4'>
                            {article?.title} {'  '}
                            {liked ? 
                                <BsHeartFill className='inline w-7 h-7 cursor-pointer' /> : <BsHeart onClick={likeArticle} className='inline w-7 h-7 cursor-pointer' />
                            } 
                        </h1>
						<div>{article && parse(article?.content)}</div>
                    </div>
                )
            }
            <Footer />
        </div>
    )
}

export default ArticleInfo;