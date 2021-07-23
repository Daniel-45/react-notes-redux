import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: 'daniel45',
    api_key: '665568947781127',
    api_secret: 'blCQtlS5EYy0cL03VaOgneBlg2M'
});

describe('Tests in fileUpoads helper', () => {
    test('Should uploading a file and return URL', async () => {
        const res = await fetch('https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png');
        const blob = await res.blob();
        const file = new File([blob], 'react.png');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // Remove image by id
        const segments = url.split('/');
        const imageId = segments[segments.length -1].replace('.png', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {});
    });

    test('Should return an error', async () => {
        const file = new File([], 'react.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });

});
