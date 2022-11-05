import { FC } from 'react'
import { getPhoto } from '../../hooks/hooks'
import { useAppDispatch } from '../../hooks/reactReduxHooks'
import { SVG } from '../../img/icons/exportIcons'
import { changeUserProfile, deletePhotoThunk } from '../../store/slices/apiActions/userActions'
// @ts-ignore
import s from './Photo.module.css'
// import StyledPhoto from '../styleedComponents/StyledPhoto'
// import { usePosition } from './../../hooks/usePosition'
// import useDeviceWidth from '../../hooks/useDeviceWidth'


type TPprops = {
	photo: string
	id: string
	hoverMouse: (rect: DOMRect) => void
	CSSposition: string
}


// const Photo: ForwardRefRenderFunction<HTMLDivElement, TPprops> = ({ id, photo}) => {


const Photo: FC<TPprops> = ({ id, photo, hoverMouse, CSSposition }) => {
	const dispatch = useAppDispatch()
	// const chaeldDiv = useRef() as RefObject<HTMLDivElement>
	// const [chaeld, setChaeld] = useState(null as DOMRect | null)

	// useEffect(() => {
	// 	setChaeld(chaeldDiv.current && chaeldDiv.current.getBoundingClientRect())
	// }, [])


	const delPhoto = (id: string, photo: string) => {
		dispatch(deletePhotoThunk(id, photo))
	}

	const setAvatar = (photo: string) => {
		dispatch(changeUserProfile(id, { avatar: photo }))
	}

	return (
		<div
			style={{ transformOrigin: `${CSSposition}` }}
			className={s.photo}
			onMouseOver={(e) => { hoverMouse(e.currentTarget.getBoundingClientRect()) }}>
			{/* <StyledPhoto cssPisition='left top' ref={ref}> */}
			<img src={getPhoto(photo)} />

			<div>
				{/* <SVG.Dustbin
					className={s.button}
					onClick={() => delPhoto(id, photo)}
				/> */}
				<button
					// onMouseOver={e => e.stopPropagation()}
					onClick={() => delPhoto(id, photo)}>
					<SVG.Dustbin className={s.button} />
				</button>
				<button onClick={() => setAvatar(photo)}>
					<SVG.More className={`${s.button} ${s.more}`} />
				</button>
				<div className={s.bage}>

				</div>
			</div>
			{/* </StyledPhoto> */}
		</div>
	)
}

export default Photo
// const Photo = forwardRef<HTMLDivElement, TPprops>(DefaultPhoto)