import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import { ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import type { RootState, AppDispatch } from '../store/store'
// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// =========================================
type BoundAsynkThunk<Thunk extends AsyncThunk<any, any, any>> = (
	...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>


type BoundActions<Actions extends ActionCreatorsMapObject> = {
	[key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
	? BoundAsynkThunk<Actions[key]>
	: Actions[key]
}

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
	actions: Actions
): BoundActions<Actions> => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(actions, dispatch), [])
}
	// =========================================