import type { CSSProperties, FC, ForwardRefExoticComponent, ReactNode } from 'react'
import { forwardRef } from 'react'

type IconProps = {
    className?: string;
    style?: CSSProperties;
    onClick?: VoidFunction
}
type IconButtonProps = IconProps & { icon?: Omit<IconProps, 'onClick'> }
type ExtendedIcon = ForwardRefExoticComponent<IconProps> & { Button: FC<IconButtonProps> }

const buildIcon = (svg: ReactNode) => {
    const icon = forwardRef<HTMLSpanElement, IconProps>(({ className, style, onClick }, ref) => {
        return (
            <span
                ref={ref} className={className}
                style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', ...style }}
                onClick={onClick}>
                {svg}
            </span>
        )
    }) as ExtendedIcon

    icon.Button = ({ className, style, onClick, icon }) => {
        return (
            <button className={className} style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            }} onClick={onClick}>
                <span className={icon?.className} style={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...icon?.style
                }}>
                    {svg}
                </span>
            </button>
        )
    }

    return icon
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

const IconLeaf = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M28.8663 3.28867C28.3115 4.02845 27.8723 4.79134 27.5024 5.57735L14.8338 8.9988C10.5801 10.1547 6.65001 12.2122 2.85867 15.2869C2.92803 15.0557 2.99738 14.8476 3.08985 14.6165C3.89898 12.4896 5.42476 10.7326 7.80591 9.18374C11.0424 7.03378 14.7875 5.53111 19.6423 4.46769C22.6476 3.77415 25.7454 3.38115 28.8201 3.28867M26.5314 8.12032C26.3465 8.79074 26.1615 9.48428 25.9997 10.1778L25.8379 10.8251C25.1675 13.5761 24.4508 16.4197 23.6879 19.1938C23.5723 19.633 23.318 20.1416 23.0406 20.6733C22.9019 20.9739 22.7401 21.2513 22.6014 21.5518C20.6595 25.1813 17.5617 27.1232 12.8918 27.655C12.3139 27.7243 11.7591 27.7474 11.2505 27.7474C9.67846 27.7474 8.3145 27.47 7.11237 26.9614C6.48819 26.6609 5.88712 26.3141 5.30917 25.9211L4.15328 25.1813C5.93336 22.0604 8.17579 19.8642 10.7188 17.3906C11.7822 16.3734 14.3252 14.3622 16.4058 13.2987L26.4852 8.14344M29.976 1C26.3002 1 22.6476 1.41612 19.0643 2.24837C14.6257 3.24244 10.3258 4.72198 6.46507 7.28807C3.9221 8.92945 1.93396 11.0101 0.870531 13.8304C-0.0310678 16.1422 -0.12354 18.246 0.10764 20.3728L0.292583 21.2051C0.500644 20.6965 1.42536 19.5637 3.11297 18.0841C7.25108 14.4315 11.3429 12.3509 15.3655 11.2644C12.9612 12.4896 10.2564 14.6858 9.14675 15.7492C6.04895 18.7777 3.50597 21.2975 1.51783 25.2738C1.19418 25.8518 0.685588 26.7765 0.361937 28.6721C0.269465 28.9264 0.431291 29.3426 0.523762 29.5737C0.778059 30.1517 1.35601 30.5216 1.95707 30.5216C2.04954 30.5216 2.14202 30.5216 2.25761 30.4985C3.0205 30.3366 3.48286 29.0883 3.99145 27.863C4.66187 28.3485 5.37853 28.7646 6.14142 29.1114C7.78279 29.8512 9.51663 30.1286 11.2505 30.1286C11.8747 30.1286 12.4988 30.0823 13.1461 30.0361C18.1627 29.4582 22.2084 27.3082 24.682 22.6615C25.0981 21.7599 25.6761 20.8352 25.9304 19.8411C26.7395 16.8589 27.5024 13.7842 28.2421 10.802C28.8201 8.30526 29.4674 5.901 31.2937 4.00533C31.8717 3.42738 32.1953 2.84943 31.8717 2.01719C31.548 1.18494 30.8776 1.02312 30.0685 1.02312H30.0222L29.976 1Z"
            fill="currentColor"/>
    </svg>
)

const IconMin = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M31.36 25.6711V6.3289C31.36 3.20001 28.8 0.640015 25.6711 0.640015H6.3289C3.20001 0.640015 0.640015 3.20001 0.640015 6.3289V25.6711C0.640015 28.8 3.20001 31.36 6.3289 31.36H25.6711C28.8 31.36 31.36 28.8 31.36 25.6711ZM6.3289 29.0845C4.45157 29.0845 2.91557 27.5485 2.91557 25.6711V22.2578H6.3289C8.20624 22.2578 9.74224 23.7938 9.74224 25.6711V29.0845H6.3289ZM12.0178 29.0845V25.6711C12.0178 22.5422 9.45779 19.9822 6.3289 19.9822H2.91557V6.3289C2.91557 4.45157 4.45157 2.91557 6.3289 2.91557H25.6711C27.5485 2.91557 29.0845 4.45157 29.0845 6.3289V25.6711C29.0845 27.5485 27.5485 29.0845 25.6711 29.0845H12.0178Z"
            fill="currentColor"/>
        <path
            d="M22.2577 17.7067C22.2577 17.0809 21.7457 16.5689 21.12 16.5689H17.024L25.0453 8.54756C25.5004 8.09245 25.5004 7.40979 25.0453 6.95468C24.5902 6.49956 23.9075 6.49956 23.4524 6.95468L15.4311 14.976V10.88C15.4311 10.2542 14.9191 9.74223 14.2933 9.74223C13.6675 9.74223 13.1555 10.2542 13.1555 10.88V17.7067C13.1555 18.048 13.2693 18.3325 13.4969 18.5031C13.7244 18.7307 14.0089 18.8445 14.2933 18.8445H21.12C21.7457 18.8445 22.2577 18.3325 22.2577 17.7067Z"
            fill="currentColor"/>
    </svg>
)

const IconPalette = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M16 0C24.8365 0 32 7.16342 32 16L31.9992 16.1537L31.9981 16.2327L31.9948 16.395L31.9896 16.5625L31.9823 16.7349L31.9734 16.9115L31.9622 17.0928L31.9416 17.3716L31.925 17.5617L31.9063 17.755L31.885 17.9511L31.8614 18.1496L31.8487 18.2495L31.8212 18.4511C31.8117 18.5186 31.8017 18.5862 31.7912 18.6544L31.7583 18.8588L31.7228 19.0641L31.6843 19.2702L31.664 19.3732L31.6211 19.5798C31.602 19.6688 31.5821 19.7575 31.5614 19.8461L31.5183 20.023C31.5111 20.0525 31.5037 20.082 31.4961 20.1113L31.4497 20.2873C31.4181 20.4042 31.3846 20.5206 31.3494 20.6365L31.2954 20.809C30.7615 22.4692 29.8639 23.9079 28.4077 24.2812C27.4571 24.5249 26.2843 24.4411 25.0414 24.2334L24.7921 24.1903L24.5409 24.1442L24.2886 24.0956L24.0351 24.0449L23.781 23.9921L23.5262 23.9381L23.0576 23.8356L22.0484 23.6119L21.6194 23.519L21.4067 23.4741L21.0909 23.4094L20.8821 23.3685L20.6755 23.3295L20.4709 23.2926L20.2684 23.2584L20.0686 23.2266L19.8711 23.198C19.7426 23.1799 19.6137 23.1638 19.4847 23.1497L19.2962 23.1308C18.2677 23.037 17.3868 23.1148 16.7811 23.5339C16.3568 23.8273 16.3551 24.3044 16.5504 24.8689L16.587 24.9696L16.6068 25.0204L16.6487 25.1235C16.6562 25.1408 16.6635 25.1582 16.6711 25.1755L16.7181 25.2808L16.7944 25.4412L16.8484 25.5497L16.9045 25.6592L17.0229 25.8809L17.1472 26.1053L17.5454 26.8093L17.6362 26.9729L17.7245 27.1354L17.7654 27.2127L17.845 27.3664C18.1034 27.8764 18.2931 28.3599 18.2931 28.7659L18.2928 28.8297L18.2898 28.9575C18.2855 29.0854 18.2767 29.2132 18.2633 29.3404L18.2483 29.4672C18.0752 30.7956 17.3894 32 16 32C7.16342 32 0 24.8365 0 16C0 7.16342 7.16342 0 16 0ZM16 2.4935C8.54047 2.4935 2.4935 8.54047 2.4935 16C2.4935 23.3102 8.30129 29.264 15.5541 29.4992L15.7005 29.5027L15.7072 29.4819C15.7481 29.3452 15.7799 29.1681 15.793 28.9691L15.7971 28.8851L15.7876 28.859L15.7658 28.8039L15.738 28.7389L15.7093 28.6755L15.6615 28.5747L15.6059 28.4642L15.5175 28.2965L15.4386 28.1511L15.2769 27.8629L15.0186 27.4074L14.9145 27.2212L14.7717 26.9604L14.6849 26.7973C14.3925 26.2396 14.2152 25.8159 14.0822 25.3209C13.695 23.8801 14.0139 22.416 15.3622 21.4833C16.4979 20.6977 17.8343 20.5016 19.4641 20.6423C19.5486 20.6497 19.6319 20.6575 19.7148 20.666L19.9596 20.6929L20.1417 20.7159L20.3262 20.7411L20.5147 20.7695L20.6435 20.7902L20.843 20.824L21.0514 20.8615L21.2704 20.9028L21.5019 20.9484L21.7473 20.9982L22.0997 21.0722L22.385 21.1335L23.1314 21.2976L23.7874 21.4431L24.1605 21.5237L24.3749 21.5686L24.684 21.6311L24.8814 21.6696L25.0726 21.7053L25.2573 21.7386L25.4355 21.7693L25.6074 21.7974L25.7732 21.8227L26.0106 21.8562L26.1614 21.8753L26.3065 21.892L26.5135 21.9121L26.6443 21.9225L26.77 21.9304L26.8307 21.9332L26.9486 21.9375L27.061 21.9391H27.1155L27.2203 21.9371C27.2889 21.9349 27.354 21.9312 27.4157 21.926L27.5065 21.9167L27.5927 21.905C27.6626 21.8946 27.7277 21.8813 27.7887 21.8655C28.1045 21.7845 28.5483 21.2083 28.9232 20.0412C29.3053 18.8493 29.5065 17.3091 29.5065 16C29.5065 8.54047 23.4595 2.4935 16 2.4935ZM6.44156 14.1299C7.58919 14.1299 8.51948 15.0601 8.51948 16.2077C8.51948 17.3554 7.58919 18.2857 6.44156 18.2857C5.29392 18.2857 4.36363 17.3554 4.36363 16.2077C4.36363 15.0601 5.29392 14.1299 6.44156 14.1299ZM24.1039 9.35064C25.2515 9.35064 26.1818 10.281 26.1818 11.4286C26.1818 12.5762 25.2515 13.5065 24.1039 13.5065C22.9562 13.5065 22.0259 12.5762 22.0259 11.4286C22.0259 10.281 22.9562 9.35064 24.1039 9.35064ZM9.35064 6.85714C10.4983 6.85714 11.4286 7.78742 11.4286 8.93506C11.4286 10.0827 10.4983 11.013 9.35064 11.013C8.20301 11.013 7.27273 10.0827 7.27273 8.93506C7.27273 7.78742 8.20301 6.85714 9.35064 6.85714ZM17.2468 4.15584C18.3944 4.15584 19.3246 5.08613 19.3246 6.23376C19.3246 7.3814 18.3944 8.31169 17.2468 8.31169C16.0992 8.31169 15.1688 7.3814 15.1688 6.23376C15.1688 5.08613 16.0992 4.15584 17.2468 4.15584Z"
            fill="currentColor"/>
    </svg>
)

const IconSetting = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M12.9958 1L13.4713 1.9496C13.7084 2.42475 14.07 2.82381 14.5161 3.10256C14.9623 3.3813 15.4755 3.52885 15.999 3.52885C16.5225 3.52885 17.0357 3.3813 17.4819 3.10256C17.928 2.82381 18.2896 2.42475 18.5267 1.9496L19.0022 1L20.0082 1.28488C22.3233 1.93888 24.4499 3.15036 26.2085 4.81703L26.9071 5.47803L26.4865 6.34757C26.2739 6.78758 26.175 7.27548 26.199 7.76521C26.2231 8.25494 26.3693 8.73036 26.6239 9.14661C26.8785 9.56286 27.233 9.90621 27.6541 10.1443C28.0752 10.3823 28.5489 10.5072 29.0306 10.5072H29.0708L30.0237 10.4942L30.3109 11.4196C31.0735 13.8968 31.2056 16.5306 30.695 19.0741L30.4609 20.2267L29.3123 20.1112C28.7508 20.0539 28.1854 20.1684 27.6882 20.4402C27.1911 20.7119 26.785 21.1285 26.5218 21.6366C26.2586 22.1447 26.1503 22.7212 26.2108 23.2923C26.2713 23.8635 26.4978 24.4032 26.8614 24.8425L27.6058 25.7399L26.8065 26.5871C25.0123 28.4871 22.7653 29.8817 20.2843 30.6351L19.0827 31L18.6986 29.7841C18.5147 29.2022 18.1542 28.6946 17.6689 28.3346C17.1836 27.9745 16.5986 27.7805 15.9981 27.7805C15.3976 27.7805 14.8126 27.9745 14.3273 28.3346C13.842 28.6946 13.4814 29.2022 13.2976 29.7841L12.9153 31L11.7137 30.6351C9.23274 29.8817 6.98574 28.4871 5.19146 26.5871L4.39219 25.7399L5.13659 24.8425C5.50016 24.4032 5.7267 23.8635 5.78721 23.2923C5.84771 22.7212 5.73944 22.1447 5.47623 21.6366C5.21303 21.1285 4.80687 20.7119 4.30976 20.4402C3.81264 20.1684 3.24717 20.0539 2.68573 20.1112L1.53712 20.2267L1.30484 19.0741C0.794451 16.5312 0.926609 13.8981 1.68893 11.4214L1.97425 10.4942L2.92716 10.5072H2.9674C3.44906 10.5072 3.92279 10.3823 4.34388 10.1443C4.76497 9.90621 5.11953 9.56286 5.37412 9.14661C5.62871 8.73036 5.77492 8.25494 5.79897 7.76521C5.82301 7.27548 5.72409 6.78758 5.51153 6.34757L5.09086 5.47803L5.78954 4.81703C7.54806 3.15036 9.67467 1.93888 11.9898 1.28488L12.9958 1ZM8.1709 6.16137C8.37026 6.899 8.41617 7.67088 8.30569 8.4276C8.19521 9.18433 7.93077 9.90925 7.52929 10.556C7.12782 11.2027 6.59815 11.757 5.97418 12.1833C5.35021 12.6097 4.64568 12.8988 3.90567 13.032C3.55775 14.5053 3.47165 16.0301 3.65144 17.5343C4.51105 17.6461 5.33154 17.9672 6.04349 18.4702C6.75544 18.9732 7.3379 19.6433 7.74159 20.424C8.14528 21.2047 8.35832 22.0728 8.36269 22.955C8.36706 23.8372 8.16263 24.7075 7.76669 25.4923C8.84265 26.4611 10.0753 27.2328 11.41 27.7732C11.8933 26.9769 12.5687 26.3197 13.3719 25.864C14.1752 25.4084 15.0795 25.1696 15.999 25.1702C17.9377 25.1702 19.6369 26.2129 20.588 27.7732C21.922 27.2326 23.1541 26.4609 24.2295 25.4923C23.8335 24.7075 23.6291 23.8372 23.6335 22.955C23.6378 22.0728 23.8509 21.2047 24.2546 20.424C24.6583 19.6433 25.2407 18.9732 25.9527 18.4702C26.6646 17.9672 27.4851 17.6461 28.3447 17.5343C28.5226 16.0301 28.4372 14.5058 28.0923 13.032C27.3524 12.8988 26.6479 12.6097 26.024 12.1833C25.4 11.757 24.8705 11.2026 24.4691 10.5559C24.0678 9.9091 23.8036 9.18415 23.6933 8.42742C23.5831 7.6707 23.6293 6.89887 23.8289 6.16137C22.744 5.26605 21.5184 4.56353 20.2039 4.08342C19.6985 4.72371 19.0582 5.24021 18.3304 5.59472C17.6026 5.94923 16.8058 6.13271 15.999 6.13158C14.298 6.13158 12.7818 5.33093 11.7923 4.08155C10.4681 4.56567 9.24452 5.27321 8.1709 6.16137Z"
            fill="currentColor"/>
        <path
            d="M9.91766 16C9.91766 15.187 10.075 14.3819 10.3806 13.6308C10.6862 12.8797 11.1342 12.1972 11.6989 11.6223C12.2636 11.0474 12.934 10.5914 13.6718 10.2802C14.4097 9.9691 15.2005 9.80896 15.9991 9.80896C16.7977 9.80896 17.5885 9.9691 18.3263 10.2802C19.0642 10.5914 19.7346 11.0474 20.2993 11.6223C20.864 12.1972 21.312 12.8797 21.6176 13.6308C21.9232 14.3819 22.0805 15.187 22.0805 16C22.0805 17.642 21.4398 19.2167 20.2993 20.3777C19.1588 21.5388 17.612 22.191 15.9991 22.191C14.3862 22.191 12.8394 21.5388 11.6989 20.3777C10.5584 19.2167 9.91766 17.642 9.91766 16ZM15.9991 12.4157C15.0653 12.4157 14.1698 12.7933 13.5095 13.4655C12.8492 14.1377 12.4783 15.0494 12.4783 16C12.4783 16.9506 12.8492 17.8623 13.5095 18.5345C14.1698 19.2067 15.0653 19.5843 15.9991 19.5843C16.9329 19.5843 17.8284 19.2067 18.4887 18.5345C19.149 17.8623 19.5199 16.9506 19.5199 16C19.5199 15.0494 19.149 14.1377 18.4887 13.4655C17.8284 12.7933 16.9329 12.4157 15.9991 12.4157Z"
            fill="currentColor"/>
    </svg>
)

const IconStar = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M31.0187 11.8851C30.7153 11.5058 30.2602 11.2024 29.8051 11.1265L21.4613 9.9129L17.7446 2.32773C17.5171 2.0243 17.2136 1.7209 16.8344 1.49335C16.3793 1.26579 15.8483 1.26579 15.3932 1.41751C14.9381 1.56919 14.5588 1.94846 14.3313 2.40357L10.6145 9.98874L2.27084 11.2024C1.89157 11.2782 1.5123 11.43 1.2089 11.7333C0.450398 12.4919 0.526238 13.7055 1.2089 14.3882L7.27706 20.3046L5.83586 28.6483C5.76002 29.0276 5.83586 29.4827 6.06341 29.8619C6.51852 30.7722 7.73218 31.1514 8.6424 30.6205L16.1517 26.6762L23.6611 30.6205C23.9645 30.7722 24.2679 30.848 24.5713 30.848H24.8747C25.4056 30.7722 25.7849 30.4687 26.0883 30.0895C26.3917 29.7102 26.4676 29.1793 26.3917 28.6483L24.9505 20.3046L31.0187 14.3882C31.3221 14.0847 31.5496 13.7055 31.5496 13.3262C31.4738 12.7953 31.3221 12.3402 31.0187 11.8851ZM23.0542 18.7876C22.5991 19.2427 22.3716 19.8495 22.5233 20.4563L23.8886 28.1932L16 24.0972L8.11141 28.1932L9.47674 20.4563C9.55262 19.8495 9.4009 19.2427 8.94579 18.7876L3.33274 13.3262L11.1455 12.1885C11.7523 12.1126 12.2833 11.7333 12.5867 11.1265L16 4.0723L19.4892 11.1265C19.7926 11.6575 20.3236 12.1126 20.9304 12.1885L28.7431 13.3262L23.0542 18.7876Z"
            fill="currentColor"/>
    </svg>
)

const IconTriDot = buildIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="none">
        <path
            d="M25 16C25 17.6553 26.3418 19 28 19C29.6553 19 31 17.6582 31 16C31 14.3447 29.6582 13 28 13C26.3447 13 25 14.3418 25 16ZM13 16C13 17.6553 14.3418 19 16 19C17.6553 19 19 17.6582 19 16C19 14.3447 17.6582 13 16 13C14.3447 13 13 14.3418 13 16ZM1 16C1 17.6553 2.3418 19 4 19C5.6582 19 7 17.6582 7 16C7 14.3447 5.6582 13 4 13C2.34473 13 1 14.3418 1 16Z"
            fill="currentColor"/>
    </svg>
)

export type {
    IconProps,
    IconButtonProps,
    ExtendedIcon,
}
export {
    IconBell,
    IconCross,
    IconFolder,
    IconLeaf,
    IconMin,
    IconPalette,
    IconSetting,
    IconStar,
    IconTriDot,
}