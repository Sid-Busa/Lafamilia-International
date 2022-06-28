import { FC, ReactElement, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { AvatarType } from './types';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import DefaultImage from 'src/images/defaultUser.png';
import API from 'src/api/Api';

const AvatarImage: FC<AvatarType> = ({
	profile = '',
	setProfile,
	variant,
	showEditIcon,
}): ReactElement => {
	const imageRef = useRef(null);

	const handleChangeProfile = async (e) => {
		const imageFile = e.target.files[0];
		const options = {
			maxSizeMB: 4,
		};
		try {
			const compressedFile = await imageCompression(imageFile, options);
			let reader = new FileReader();
			reader.readAsDataURL(compressedFile);
			reader.onloadend = function () {
				let base64String: any = reader.result;
				setProfile(base64String);
			};
		} catch (e) {
			console.log('error', e);
		}
	};
	return (
		<Badge
			overlap='circular'
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			badgeContent={
				showEditIcon && (
					<label onClick={() => imageRef?.current?.click()}>
						<EditIcon
							style={{
								backgroundColor: '#a9a9a9',
								borderRadius: '50%',
								padding: 5,
								cursor: 'pointer',
							}}
						/>
					</label>
				)
			}
		>
			<input
				type='file'
				ref={imageRef}
				accept='image/*'
				onChange={handleChangeProfile}
				style={{ display: 'none' }}
			/>
			<Avatar
				sx={{ width: 100, height: 100 }}
				alt='Travis Howard'
				variant={variant}
				src={profile || DefaultImage}
			/>
		</Badge>
	);
};

const defaultProps = {
	profile: '',
	setProfile: () => {},
	variant: 'circular',
	showEditIcon: true,
} as Partial<AvatarType>;

AvatarImage.defaultProps = defaultProps;

export default AvatarImage;
