import type { CSSProperties, ReactNode } from 'react'
import { forwardRef } from 'react'

export type IconProps = {
    className?: string;
    style?: CSSProperties;
    svg: ReactNode;
    onClick?: VoidFunction
};

const Icon = forwardRef<HTMLSpanElement, IconProps>(
    ({ className = '', style = {}, svg, onClick }, ref) => {
        return (
            <span
                ref={ref} className={className}
                style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', ...style }}
                onClick={onClick}>
                {svg}
            </span>
        )
    }
)

const buildIcon = (svg: IconProps['svg']) => {
    return forwardRef<HTMLSpanElement, Omit<IconProps, 'svg'>>((props, ref) => (
        <Icon ref={ref} svg={svg} {...props}></Icon>
    ))
}

const IconBell = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M26.24 20.0202V13.7244C26.24 9.5526 23.7369 5.98755 20.1719 4.39466C20.0202 2.19495 18.1997 0.450378 16 0.450378C13.8003 0.450378 11.9799 2.19495 11.8282 4.39466C8.26313 5.98755 5.76001 9.5526 5.76001 13.7244V20.0202C3.71201 21.6889 2.72595 23.9644 2.72595 26.6193C2.72595 27.2261 3.2569 27.757 3.86373 27.757H11.2213C11.7523 29.9567 13.7245 31.5496 16 31.5496C18.2756 31.5496 20.2477 29.9567 20.7787 27.757H28.1363C28.7431 27.757 29.2741 27.2261 29.2741 26.6193C29.2741 23.8886 28.288 21.6889 26.24 20.0202ZM16 2.72593C16.6827 2.72593 17.2895 3.10517 17.5929 3.63616C17.062 3.56028 16.531 3.48444 16 3.48444C15.4691 3.48444 14.9381 3.56028 14.4071 3.63616C14.7105 3.10517 15.3173 2.72593 16 2.72593ZM16 29.2741C14.9381 29.2741 14.0279 28.6673 13.6486 27.757H18.4273C17.9722 28.6673 17.062 29.2741 16 29.2741ZM5.07735 25.4815C5.3049 23.8127 6.13929 22.5233 7.58046 21.4613C7.88385 21.2338 8.03557 20.9304 8.03557 20.5511V13.7244C8.03557 9.32505 11.6006 5.76 16 5.76C20.3994 5.76 23.9645 9.32505 23.9645 13.7244V20.5511C23.9645 20.9304 24.1162 21.2338 24.4196 21.4613C25.8607 22.5233 26.6951 23.8127 26.9227 25.4815H5.07735Z"
            fill="currentColor"/>
    </svg>
)

const IconCross = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M28.7264 30C28.3906 29.9972 28.0692 29.8633 27.8307 29.6268L2.37799 4.16969C1.87416 3.66577 1.87416 2.86324 2.37799 2.37799C2.88182 1.89274 3.68422 1.87407 4.16939 2.37799L29.6221 27.8351C30.126 28.339 30.126 29.1415 29.6221 29.6268C29.3837 29.8633 29.0622 29.9972 28.7264 30Z"
            fill="currentColor"/>
        <path
            d="M3.27368 30C2.93787 29.9972 2.61646 29.8632 2.37798 29.6267C2.25836 29.5102 2.16329 29.3709 2.09837 29.217C2.03345 29.0632 2 28.8979 2 28.7309C2 28.5639 2.03345 28.3986 2.09837 28.2447C2.16329 28.0908 2.25836 27.9515 2.37798 27.835L27.8307 2.37794C28.3346 1.87402 29.137 1.87402 29.6221 2.37794C30.1073 2.88185 30.126 3.68439 29.6221 4.16964L4.16938 29.6267C3.9268 29.8693 3.60957 30 3.27368 30Z"
            fill="currentColor"/>
    </svg>
)

const IconFolder = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M8.12799 4.2667H3.07306L3.13386 23.6032C3.13386 23.8861 3.02148 24.1574 2.82144 24.3575C2.6214 24.5575 2.35009 24.6699 2.06719 24.6699C1.7843 24.6699 1.51298 24.5575 1.31295 24.3575C1.11291 24.1574 1.00053 23.8861 1.00053 23.6032L0.93866 4.2667C0.93866 3.98654 0.99384 3.70913 1.10105 3.4503C1.20826 3.19148 1.3654 2.9563 1.5635 2.7582C1.7616 2.5601 1.99677 2.40296 2.2556 2.29575C2.51443 2.18854 2.79184 2.13336 3.07199 2.13336H9.00266L12.2453 5.33336H28.8544C29.1373 5.33336 29.4086 5.44574 29.6086 5.64578C29.8087 5.84582 29.9211 6.11713 29.9211 6.40003C29.9211 6.68293 29.8087 6.95424 29.6086 7.15428C29.4086 7.35431 29.1373 7.46669 28.8544 7.46669H11.3717L8.12906 4.2667H8.12799Z"
            fill="currentColor"/>
        <path
            d="M3.18398 23.4538C3.12999 23.7272 2.97119 23.9686 2.74154 24.1263C2.51188 24.2841 2.22961 24.3458 1.95508 24.2981C1.68056 24.2504 1.43558 24.0973 1.27254 23.8713C1.10951 23.6454 1.04135 23.3646 1.08265 23.089L2.90345 12.6176C3.19678 10.9312 4.75945 9.59998 6.45865 9.59998H28.7541C30.5994 9.59998 31.8848 11.1573 31.5669 12.9824L29.1562 26.849C28.8608 28.5354 27.2992 29.8666 25.6 29.8666H4.26665C3.98375 29.8666 3.71244 29.7543 3.5124 29.5542C3.31236 29.3542 3.19998 29.0829 3.19998 28.8C3.19998 28.5171 3.31236 28.2458 3.5124 28.0457C3.71244 27.8457 3.98375 27.7333 4.26665 27.7333H25.6C26.257 27.7333 26.9365 27.1541 27.0539 26.4842L29.4645 12.6176C29.5573 12.0874 29.265 11.7333 28.7541 11.7333H6.45865C5.80265 11.7333 5.12212 12.3125 5.00585 12.9824L3.18398 23.4538Z"
            fill="currentColor"/>
    </svg>
)

const IconSetting = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M12.7955 0L13.3027 1.01291C13.5556 1.51973 13.9413 1.9454 14.4172 2.24273C14.8931 2.54006 15.4406 2.69744 15.9989 2.69744C16.5573 2.69744 17.1048 2.54006 17.5807 2.24273C18.0566 1.9454 18.4423 1.51973 18.6951 1.01291L19.2024 0L20.2754 0.303873C22.7449 1.00147 25.0133 2.29371 26.889 4.0715L27.6343 4.77656L27.1856 5.70407C26.9588 6.17342 26.8533 6.69384 26.879 7.21622C26.9046 7.7386 27.0606 8.24572 27.3321 8.68972C27.6037 9.13372 27.9819 9.49996 28.4311 9.75388C28.8802 10.0078 29.3855 10.141 29.8993 10.141H29.9422L30.9587 10.1271L31.265 11.1142C32.0784 13.7566 32.2193 16.566 31.6747 19.279L31.4249 20.5084L30.1998 20.3853C29.6009 20.3242 28.9977 20.4463 28.4675 20.7362C27.9372 21.0261 27.504 21.4704 27.2232 22.0124C26.9425 22.5544 26.827 23.1693 26.8915 23.7785C26.9561 24.3877 27.1977 24.9634 27.5855 25.432L28.3795 26.3893L27.527 27.2929C25.6131 29.3196 23.2163 30.8071 20.57 31.6107L19.2882 32L18.8785 30.7031C18.6824 30.0823 18.2978 29.5409 17.7802 29.1569C17.2625 28.7728 16.6385 28.5659 15.998 28.5659C15.3574 28.5659 14.7334 28.7728 14.2158 29.1569C13.6981 29.5409 13.3135 30.0823 13.1174 30.7031L12.7097 32L11.4279 31.6107C8.78159 30.8071 6.38479 29.3196 4.47089 27.2929L3.61833 26.3893L4.41236 25.432C4.80017 24.9634 5.04181 24.3877 5.10636 23.7785C5.1709 23.1693 5.0554 22.5544 4.77465 22.0124C4.4939 21.4704 4.06067 21.0261 3.53041 20.7362C3.00015 20.4463 2.39698 20.3242 1.79812 20.3853L0.572932 20.5084L0.325164 19.279C-0.219253 16.5667 -0.0782837 13.758 0.734859 11.1162L1.0392 10.1271L2.05564 10.141H2.09856C2.61233 10.141 3.11764 10.0078 3.5668 9.75388C4.01596 9.49996 4.39417 9.13372 4.66573 8.68972C4.93729 8.24572 5.09325 7.7386 5.1189 7.21622C5.14454 6.69384 5.03903 6.17342 4.8123 5.70407L4.36359 4.77656L5.10884 4.0715C6.9846 2.29371 9.25299 1.00147 11.7225 0.303873L12.7955 0ZM7.64895 5.50546C7.86161 6.29227 7.91058 7.1156 7.79273 7.92278C7.67489 8.72996 7.39282 9.5032 6.96458 10.193C6.53634 10.8829 5.97136 11.4741 5.30579 11.9289C4.64022 12.3837 3.88873 12.692 3.09939 12.8342C2.72827 14.4057 2.63643 16.0321 2.82821 17.6365C3.74512 17.7559 4.62031 18.0983 5.37972 18.6348C6.13913 19.1714 6.76042 19.8862 7.19103 20.7189C7.62163 21.5516 7.84888 22.4777 7.85354 23.4187C7.8582 24.3597 7.64013 25.288 7.2178 26.1251C8.36549 27.1585 9.68035 27.9817 11.1041 28.5581C11.6196 27.7087 12.34 27.0076 13.1967 26.5216C14.0535 26.0357 15.0181 25.7809 15.9989 25.7815C18.0669 25.7815 19.8793 26.8937 20.8938 28.5581C22.3168 27.9814 23.631 27.1583 24.7781 26.1251C24.3558 25.288 24.1377 24.3597 24.1424 23.4187C24.147 22.4777 24.3743 21.5516 24.8049 20.7189C25.2355 19.8862 25.8568 19.1714 26.6162 18.6348C27.3756 18.0983 28.2508 17.7559 29.1677 17.6365C29.3575 16.0321 29.2663 14.4062 28.8985 12.8342C28.1092 12.6921 27.3577 12.3837 26.6922 11.9289C26.0267 11.4741 25.4618 10.8828 25.0338 10.1929C24.6057 9.50304 24.3238 8.72976 24.2062 7.92259C24.0886 7.11541 24.1379 6.29213 24.3509 5.50546C23.1936 4.55045 21.8863 3.8011 20.4841 3.28898C19.9451 3.97196 19.2621 4.52289 18.4858 4.90103C17.7094 5.27918 16.8596 5.47489 15.9989 5.47368C14.1846 5.47368 12.5672 4.61966 11.5118 3.28699C10.0993 3.80338 8.79415 4.55809 7.64895 5.50546Z"
            fill="currentColor"/>
        <path
            d="M9.51215 16C9.51215 15.1328 9.67993 14.2741 10.0059 13.4729C10.3319 12.6717 10.8097 11.9437 11.4121 11.3304C12.0145 10.7172 12.7296 10.2308 13.5166 9.89892C14.3036 9.56705 15.1471 9.39624 15.999 9.39624C16.8509 9.39624 17.6944 9.56705 18.4814 9.89892C19.2684 10.2308 19.9835 10.7172 20.5859 11.3304C21.1882 11.9437 21.6661 12.6717 21.992 13.4729C22.318 14.2741 22.4858 15.1328 22.4858 16C22.4858 17.7514 21.8024 19.4311 20.5859 20.6696C19.3694 21.908 17.7194 22.6038 15.999 22.6038C14.2786 22.6038 12.6286 21.908 11.4121 20.6696C10.1956 19.4311 9.51215 17.7514 9.51215 16ZM15.999 12.1768C15.003 12.1768 14.0477 12.5796 13.3434 13.2966C12.6391 14.0136 12.2434 14.986 12.2434 16C12.2434 17.014 12.6391 17.9865 13.3434 18.7035C14.0477 19.4204 15.003 19.8233 15.999 19.8233C16.995 19.8233 17.9503 19.4204 18.6546 18.7035C19.3589 17.9865 19.7545 17.014 19.7545 16C19.7545 14.986 19.3589 14.0136 18.6546 13.2966C17.9503 12.5796 16.995 12.1768 15.999 12.1768Z"
            fill="currentColor"/>
    </svg>
)

export {
    IconBell,
    IconCross,
    IconFolder,
    IconSetting
}