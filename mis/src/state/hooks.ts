/**
 * Since these are actual variables, not types,
 * it's important to define them in a separate file,
 * not the store setup file. This allows us to import them into any
 * component file that needs to use the hooks, and avoids potential circular
 * import dependency issues.
 */

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
