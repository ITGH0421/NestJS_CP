import { useCallback } from 'react';
import { kebabCase } from 'es-toolkit';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useScroll, useHashScroll } from './hooks';
import { allComponents } from './nav-config-components';
import { PrimaryNav, SecondaryNav } from './component-nav';
import { HeroArea, GridWrapper, FlexibleSection, FlexibleContainer } from './styles';

// ----------------------------------------------------------------------

const OFFSET_TOP = 120;

export function ComponentLayout({
  sx,
  children,
  heroProps,
  sectionData,
  containerProps,
  queryClassName = 'scroll__to__view',
  offsetValue = 0.3, // 0 ~ 1 => 0% => 100%
  ...other
}) {
  const activeIndex = useScroll(queryClassName, offsetValue);
  const scrollToHash = useHashScroll(OFFSET_TOP);

  const scrollToSection = useCallback(
    (index) => {
      const sections = document.querySelectorAll(`.${queryClassName}`);
      if (sections[index]) {
        const id = sections[index].id;
        scrollToHash(`#${id}`);
      }
    },
    [queryClassName, scrollToHash]
  );

  const renderPrimaryNav = () => <PrimaryNav navData={allComponents} />;

  const renderSecondaryNav = () =>
    !!sectionData?.length && (
      <SecondaryNav navData={sectionData} activeItem={activeIndex} onClickItem={scrollToSection} />
    );

  const renderHero = () => (
    <HeroArea sx={heroProps?.sx}>
      <Container>
        {heroProps?.overrideContent ?? (
          <>
            <CustomBreadcrumbs
              {...heroProps}
              links={[{ name: 'Components', href: paths.components }, { name: heroProps?.heading }]}
            />
            {heroProps?.additionalContent}
          </>
        )}
      </Container>
    </HeroArea>
  );

  const renderContent = () => (
    <FlexibleContainer maxWidth="md" {...containerProps}>
      {children ?? (
        <FlexibleSection>
          {sectionData?.map((section) => {
            const hashId = `${kebabCase(section.name)}`;

            return (
              <Card key={section.name} id={hashId} className={queryClassName}>
                <CardHeader
                  titleTypographyProps={{
                    component: Link,
                    href: `#${hashId}`,
                    color: 'inherit',
                    sx: { display: 'inline-flex', '&:hover': { opacity: 0.8 } },
                  }}
                  title={section.name}
                  subheader={section.description}
                />
                <CardContent>{section.component}</CardContent>
              </Card>
            );
          })}
        </FlexibleSection>
      )}
    </FlexibleContainer>
  );

  return (
    <>
      {heroProps?.topNode}
      {renderHero()}
      {heroProps?.bottomNode}

      <GridWrapper
        sx={[
          (theme) => ({
            '--wrapper-gutters': '16px',
            '--wrapper-gap': '24px',
            '--nav-gutters': '16px',
            '--nav-width': '220px',
            '--primary-nav-list-gap': '24px',
            '--primary-nav-item-gap': '6px',
            '--secondary-nav-item-gap': '10px',
            '--section-gap': '24px',
            '--section-padding': '24px',
            [theme.breakpoints.up('md')]: { '--wrapper-gutters': '20px' },
            [theme.breakpoints.up('xl')]: { '--wrapper-gutters': '80px' },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {renderPrimaryNav()}
        {renderContent()}
        {renderSecondaryNav()}
      </GridWrapper>
    </>
  );
}
