import * as React from 'react';

interface EmailTemplateProps {
    emailType: string;
    hashedToken: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    emailType,
    hashedToken,
}) => (
    <div>
        <div>
            <h1>{emailType === 'verify'
                ? 'Email Vreification '
                : 'Reset Your Password'}</h1>
            <p>
                Click{' '}
                <a
                    href={
                        emailType === 'verify'
                            ? `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verifyEmail?token=${hashedToken}`
                            : `${process.env.NEXT_PUBLIC_BASE_URL}/auth/resetPassword?token=${hashedToken}`
                    }
                >
                    here
                </a>{' '}
                to{' '}
                {emailType === 'verify'
                    ? 'verify your email'
                    : 'reset your password'}
            </p>
        </div>
    </div>
);


