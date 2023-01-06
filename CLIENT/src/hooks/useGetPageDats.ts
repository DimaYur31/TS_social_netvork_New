import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"



const useGetPageData = (index: number, cb: (id: string) => any) => {
	const location = useLocation()
	const path = location.pathname.split('/')
	const renderId = path[index]
	const [data, setData] = useState()

	const getData = async () => {
		const response = await cb(renderId)
		response && setData(response)
	}

	useEffect(() => {
		getData()
	}, [])

	return { data, renderId }
}

export default useGetPageData