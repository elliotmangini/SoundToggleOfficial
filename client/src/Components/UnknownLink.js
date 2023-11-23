import React from 'react';

export default function UnknownLink({ URL, fill }) {
    return (
        <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 0 25 25"
                width="30px"
                height="30px"
                fill="none" // Set the fill to "none" to make the background transparent
            >
                <path
                    d="M12 22.3201C17.5228 22.3201 22 17.8429 22 12.3201C22 6.79722 17.5228 2.32007 12 2.32007C6.47715 2.32007 2 6.79722 2 12.3201C2 17.8429 6.47715 22.3201 12 22.3201Z"
                    stroke={fill} // Set the stroke color to white
                    strokeWidth="1.5" // Use strokeWidth instead of stroke-width
                    strokeLinecap="round" // Use strokeLinecap instead of stroke-linecap
                    strokeLinejoin="round" // Use strokeLinejoin instead of stroke-linejoin
                />
                <path
                    d="M2 12.3201H22"
                    stroke={fill} // Set the stroke color to white
                    strokeWidth="1.5" // Use strokeWidth instead of stroke-width
                    strokeLinecap="round" // Use strokeLinecap instead of stroke-linecap
                    strokeLinejoin="round" // Use strokeLinejoin instead of stroke-linejoin
                />
                <path
                    d="M12 22.3201C13.933 22.3201 15.5 17.8429 15.5 12.3201C15.5 6.79722 13.933 2.32007 12 2.32007C10.067 2.32007 8.5 6.79722 8.5 12.3201C8.5 17.8429 10.067 22.3201 12 22.3201Z"
                    stroke={fill} // Set the stroke color to white
                    strokeWidth="1.5" // Use strokeWidth instead of stroke-width
                    strokeLinecap="round" // Use strokeLinecap instead of stroke-linecap
                    strokeLinejoin="round" // Use strokeLinejoin instead of stroke-linejoin
                />
            </svg>
        </a>
    )
}
