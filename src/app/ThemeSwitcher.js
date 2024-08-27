import { Switch } from '@mui/material';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SunIcon } from '@/utils/SunIcon';
import { MoonIcon } from '@/utils/MoonIcon';

const ThemeSwitcher = () => {
    const [mounted , setMounted] = useState(false);
    const { theme , setTheme } = useTheme();
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div>
            <Switch
                checked={theme === 'dark'}
                onChange={handleTheme}
                color="secondary"
                icon={<SunIcon />}
                checkedIcon={<MoonIcon />}
            />
        </div>
    );
}

export default ThemeSwitcher;
