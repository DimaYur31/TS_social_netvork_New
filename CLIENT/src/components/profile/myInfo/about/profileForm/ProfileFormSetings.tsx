import { FormEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reactReduxHooks';
import { changeUserProfile } from '../../../../../store/slices/apiActions/userActions';
import { selectDefaultUserId } from '../../../../../selectors/selectors';
import { PrimaryButton } from '../../../../elements/btn/primaryButton/PrimaryButton';
import style from './ProfileFormSetings.module.scss';

type FormChanges = {
	name: string
	surname: string
	birthday: string
	city: string
	job: string
	country: string
	languages: string
}

type FormFields = {
	name: HTMLInputElement
	surname: HTMLInputElement
	birthday: HTMLInputElement
	city: HTMLInputElement
	country: HTMLInputElement
	job: HTMLInputElement
	languages: HTMLInputElement
}

const getFormValues = (obj: FormChanges) => {
	const key = Object.keys(obj);
	const values = Object.values(obj);
	const newObj = {} as any;

	for (let i = 0; i < values.length; i++) {
		if (values[i].trim() !== '') {
			newObj[key[i]] = values[i];
		}

	}

	return newObj;
};

type ProfileFormSetingsProps = {
	onClose: (isopen: false) => void
	reload: () => void
}
export const ProfileFormSetings = ({ onClose, reload }: ProfileFormSetingsProps) => {
	const dispatch = useAppDispatch();
	const defaultUserId = useAppSelector(selectDefaultUserId);

	const handelSubmit: FormEventHandler<HTMLFormElement & FormFields> = (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		const { name, surname, birthday, city, country, job, languages } = form;

		const formChanges = {
			name: name.value,
			surname: surname.value,
			birthday: birthday.value,
			city: city.value,
			job: job.value,
			country: country.value,
			languages: languages.value,
		};

		const changes = getFormValues(formChanges);

		if (!changes) return;

		dispatch(changeUserProfile(defaultUserId, changes));
		reload();
		onClose(false);
	};

	return (
		<form onSubmit={handelSubmit} className={style.form}>
			<fieldset>
				<legend>Name</legend>
				<input name='name' type='text' />
			</fieldset>
			<fieldset>
				<legend>Surname</legend>
				<input name='surname' type='text' />
			</fieldset>
			<fieldset>
				<legend>Birthday</legend>
				<input name='birthday' type='date' />
			</fieldset>
			<fieldset>
				<legend>City</legend>
				<input name='city' type='text' />
			</fieldset>
			<fieldset>
				<legend>Country</legend>
				<input name='country' type='text' />
			</fieldset>
			<fieldset>
				<legend>Job</legend>
				<input name='job' type='text' />
			</fieldset>
			<fieldset>
				<legend>Languages</legend>
				<input name='languages' type='text' />
			</fieldset>

			<PrimaryButton type='submit'>Edit</PrimaryButton>
		</form>
	);
};