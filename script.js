let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'https://audio.com/s3w/audio.com.static/audio/image/70/21/1836710756472170-1836710797771215.jpeg@256?qlt=75',
        name: 'Die with a Smile',
        artist: 'Lady Gaga, Bruno Mars',
        music: 'Die With a Smile (JLAY EDITED).mp3'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmK_0NOU_zuN_rftZGnINqHFhtfvoBf5bcseDmHTE&s',
        name: 'Rockabye',
        artist: 'feat. Sean Paul & Anne-Marie',
        music: '\Clean Bandit - Rockabye (Lyrics) feat. Sean Paul & Anne-Marie.mp3'
    },
    {
        img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIWFhUVFRYVFRgYFxgVFRYYFxcXFxcXFxUYHighGBolHRUXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGy0lHyYrLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQMEBQYHAgj/xABMEAACAQIDBgQDBAcFBAcJAAABAgMAEQQSIQUGEzFBUQciYXEygZEUQqHRI1JicrHB8CQzgpLhFUNT8RZjc6KywtIXNDVUdJOUo7P/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQMCBAX/xAAmEQACAgICAgICAgMAAAAAAAAAAQIRAyESMUFREyJhoQTRMnGB/9oADAMBAAIRAxEAPwDHBSiNSddqt67UYHeHnK8vmKdsb6j/AJVGIbU5jmPz/jVEwQ4zdfqKTmS4uP69K70Oo+nanmE2RiZFzxYaaRCSLpG7rcc7FRa9af5GQ16T5H0NSf8AsqZ5DHHBK0ii7RrG5kUC1yyWuOY5jqKGI3fxaqzPhMQqqCzM0MiqoGpJJWwHrWGIiJFsa4qYl3cxgUlsHiQAL3MEtre+XlTTA7IxEyloMPNKoNi0cTyKDYGxKg2NiDb1qboBiKXj/iKevu5jAVBweJBYkKDBICxALEKMupsrG3YGlBu3jQLnBYkW1N4JdAOd/LQmBDmip5hdnTTFhBDJLbU8NGksDyvlBtXEWzZ2kMKQytKL3jEbGQW53QC4+lJgNhQqWG6+O/8AkcV/+PL/AOmosRtmy5Tmvly2Oa97WtzvfS1AHNCneL2VPEypLBLG7/ArxujPrbyhhdtSBpTgbuYzNk+x4nMAGK8CTMFJIDEZb2JUi/oaAGCUEFL4LAyzHLDFJKQLkRo0hA7kKDYV2MFKJOFwn4pIXh5GElzyGS17ntamgGrmhGt6dSbLnEohaCUSta0ZjYSG+oshFzy7U6Xd/Fksi4TEFksHAhkJUkZgGAXS4IOvSnaAjma/tRM1qkMTsHFxoXkwmIRVF2ZoZFVR3LFbCoomiwATRUKMCkAQFKKtGB/X50L06A6sO1CubetCmAAacYZDfSkCtLYd7HnakgXY5aAH0bt+VN2UjQ0/Vww1oSx/rajv1HvWyjjYzSSvQngw19lp/wBrN/4689ywkeorUd2t5I8Pu/IkeKSPFB5CiCRRNrMuqoTc+W/TlU8u41+THRosyxjbMRW3EOAn4lueUT4fh3//AGWqmeJu09r4fCzmb7GcLKzwDIJDNkkDBb3sA2UanvUB4UbeUbRknxmIUFsM6mSaQDM3EhIXM51NlOnYVKb67HwEkGJl/wBtvK1pJo4DiopIy9mZEWPU2ubADWp8Kkkws2KLkPYfwqlbo/Dtb7Dw8322XhX/ALri8CK98v3eJm5UvjN9MAZUwz4qAwzYeUO4mTKjLkGRnB8pZXe1z9zSqLutjsPgdmbVw646HiCSf7OyTIHkHAQRvHla5Jtby8mBHSpcWMn8JtPaY2rgcLtD7LYiedDAHvdYJ4/MX/eOlu1KeIW1tr4SPETr9jOEWyqCJDPlkKxi40W9271mvhrts/7Vw82MxRyokw4k8pKqDE4AzyHS5PLuavW9ezNm4ozyPt1ssl34AxkJhuBdVEZJ0uB86bjTVhYe0tttsXY2B+yRxl5ghcuCQWaPiOxAIJJNgNdB7Cqft/xUaTFQYzDYVIpooWjdn8+fOFutlt5VIbKSb+Y6VZNnbT2ZtXZmGw2NxQw02GCA5nSJrouTMpkGVlZenMH8aH4kQbMjljTZhZsqWmYMXiZgAFKk82OpYg5eVtb1qKV7Qmatvbv1isNsrA4yIRcXEcLiBlJTzwtIcqhgRqO9YXsyUvi4nPNsRGxtyu0gJt9a0Df3a2Hk2Hs2GOeJ5Y+BxI1dWkS2HdTmQG62Jtr1rOtkOFnhZiABLGSToAA6kknoKcFpgz05vzu2uMWFgBxsNPHPGeuUOpkT2ZVPzUU7i/8AiUv/ANFB/wD3xNU/b/iBh4dq4Ux4mKTDyxNFOySK6xkveN2Kk2sSf8LNUxFvVgP9oSP9uw2Q4SFQ3HjylhNOSoOa1wGBt6ipUxla2ZtI7K2DhZsLEjzYlowcwNmeXM12sQWsq5QLjpTPbeJxk+0tlTYrZ32bJiIozIWDM7sQxTynRBlYgG55660nult3Z+O2XFgMdiBhpMOUKMXWP+7JMbo7gqTY5SDrz9DUhvRvlgnxGzcPHiuNwMZDLNiGZcgCqy3eQAKWOe5K6C1aV+tgS+19zMTJtuHaCmLgxiPMCzcTyqwNly25t3qC25vhiMJt18NEI+HiZ8EJMykt5o4ozlIYW0PY0123vWv/AEggaPHD7JaPOVn/ALN8D5s1myc7Xv6VXd89pwvvDHOk0bQifBEyK6tGAnCzHODawsb9rU0n59AWTxs3wxEMr4BBHwZsOjOSpMnmdwbNmsPgHSsYq++NW0YZ9oq8EscqfZ41zRurrcPISLqSL6jT1qiAVTGvqJhAV2KAoGtiBQLUVHagDmjo6FADrnRBKO4NHY1sYaG3L6U4ixH/AC/I01zUdA06Hwt0+YPKm8mGufKDf9Xr8u9cLIR/WtWvcvBiVixbLkBbQXc/dCrobXJ526W0zXGck1CNm1UtFQYFTZgQexFj+NLo4bQ/KrhvJFllVeCWR18xZUvmJ0YMASvXQd6r+19jGFgLWzDMmtw4529GH5dwali/kqXYp43Hoj5YelMmFPo5wRY02lSrskxGkmFKmuXFZYHIrg10KJhSGc0dChSAAFdiuRXRpgA60CaKioABNFR2owKAAFrqhQtQAVGBSkcRP9aUqAq/tH8P9adAJxQluQ/KlcqLz8x9OX1riSYn27chSJNO0hjj7T+wtCmt6FHJhY64R6a0ViKU4RFAsRz/ABpgcZu9H7Udx2tRZOxoAFWbcnGWeWIXDSwuqsOd1ZZR7fA2vrVZsRUlu1iRHi4HPSVAfZjlP8axkXKLQRdSRsuJxuHkbLp5Ftb2Fh+Aqlb/AE4e0aoRw/Ne3pzv8qu+7kOGlAkCqWUsyty53udD7j5Uy3yxcTYZwWUs7pGCBzuQxAa2vI15cLUk32d8opxa8GJyJbUf8qAe+hrtmsSp5gkfTSk3TtXsf6PPZw60mKVDdDSbrWWZOLa1y4rs1y1ZGcUKMCiINKxnQoVKbQ3fnhhSZ1vG5tcfdJ5Bu1xqDUXSjJSVobTXYVACjAroCtCCAo7V0qV2AB606A5SO9KAAev8KI360VMYbuT/AFp9KTJromiy0mBwaI13lorUgOLUdHahQIvO3N0JID5la3e1x9RVeeD9sfP/AFrVMJ4jQSplmQqTz6rVV3ljw0jAwEC+p6inCT6kjbop7wH9W/tSLR+4p5LDYmx/jSZY9/x/OqUjA3F+hpfZ+HkklRIoy8hYZFUakg3Hy058hSuEw7SukaKGZ2VFHcsQBy9TXobdHcyDAJZBmlYASSn4m7hf1Vv0+tzrU5yUQSsjsPsBcMiW0j7qSHR2sWvbmC1/4VJY3d+DFw5Z1zDMpjNypVl5MCtiDc2+tTMzhSBbRzbXkD1/D8R60lOpBiQC6gknncWtlP1J+dq4uFS5HS5txookvhZhHZzLxFLHyskmW2gHIgjNcH3vWd+IG5L7NdCr8SCW4RiLMGAuVcDS9tQRzsdNK9FSRg3BAIOhqi+K2yHk2a4HmMDrKvUlFuG+YVm+lXhKiUqezAWNFC2vm5EaetCtz2Lu5gp9nxosSMTGCHUDiByLlg41zA62+VGXJxFjhyMGDa/1pRmtL2juo4hMxi4eJw7CTkAJYwdHKqSOguNbajW+mdYplJuote9x0GvIaUseTkE8fEatVi3W3WmxOJWBw0N42kJdCpKaDyBhqTmFjy1vryNfIq97B3+k/RpOELJkVJjowUGxD6i4s3TovK9GXkl9Qx8W/saZ/wBGA2GEOIGYMwuFJYABQtrkX6c9PlWDbYwPBxE0XSOR0HsGIH4Wr0XisVfDM0yMUCFzwmDZwBmspuCb9ja9edNoYsTTSSgWzuzAHmAToD62tU/4+2/RXPVL2NQtdha6VTSq4YmuxI50hGgKfxbOJ7/IU6TZtudvmQK1RRQbIcJSq4ZjyBqaTDIObqPYXpUNEOrN+FFG1i9shlwB62FA4QD19qmTiE6R/XWm8sjNyW3tRRpwiiIki9KS4VSMkDHmKSOGNKiTiMuHR08+ytQooXFkxsbZ4l5sLAEmkNp7NeEghhZgSNdQPWoWDFMvwsRfnTrEbRaTVm6AD0AqVSUrvRkNJm62NOVysLECoo+9dD3q1maLPudaLaGFc2yiZAdeWbyX+Wa/yr0g3K/bn/OvJaykahiCOR7Hoa9SbA2uuJw8Uy3tKitr0NtQfUG4+VQzLpmoDySEMpU/Xt2NKKOXtXKGxt/Xp/XpSkmgv21qFmw7U1xCB1dTrbysOdwR19waJ8dpoPrUbFtbLLlksBJ5Q1rDNbRT79D6EdRWeSTNKDqzzZvFs04bEzQW/u5GVf3OaH5qVNXPw03pghBgnIRiQY5TqAAcxjY/dGh15an5r+OWycmJixKjyzJlJ6Zk1HzKt/3az7GxKuULyMcT/Nlu343q86lFIxFuLtHpHiieIMVte6rcgllYWblpbkeZ5CsE3k3Qnw7uwjbhiRlUjU5ea6c+RHvY9jWyeEGBVNnxtbVizXt0Y6fw/hVnxcCtnzJmAPw5bhtBoQdDUIRcXdlZyUtUeUgl6nt29058axEa2VfiY6AX5AaG5racRuLhHDK2Hjzvcu1gGUnpGRbL7rai3A2N9kjlhzXKzP5upHNL+uUityzWqWmZji3fgpmwdq4vZ3CwmNRWwxbhpJcgR3J8rkj4Tew7VBb0bnPBJngUNExAKaBgfu26G/Iep9a2LeXY64nDTQjLmkRlUsMwViNGt3B1HqBVAwWyZtnzphcZI0mBxY4KyH/dSkAAi+qLfS3LW/3TWIXdrs1OqplEw8VwCoWxFx1p1FhHPIj5AX/CpfHwPgsfJFj1CRSF5InXSNtScwOp11uL3BPa1VnF70yB2MByAk20FwOnMV2vP4S/ownFK2S8myJQLuWA9SQPxrldljqw+o/OtQ8Nd3lfCifF3mnl8zCTzBF1yqicl0NzpzJ9KsWN3QwrjyxrGe6qLf5SLUQzpr7fo3aTpmJps1e4/D86cJs9O4+oq+bR3ZeIMRGkmW/JQC3IqACLfCepGo61CzlEYq8IBDFT5BzW1/lqDf1qqnF9F4pPog1wKdx9R+VdHBp6f5v9KmRiIOqKP8J/Ou0xGGPSP8fzplKIA4VOy/U0Bh4+yfjU7JwCdFj+poxDCf8Adp/mpDogOEnZKFWH7JF/wl/zUKQUZMMOexroYY9vxoGdjyps2JbvWG0jzXQ64HqKMhRzao9pD3rnNS5mbJAyp61sPgjvEskb4JviivLF6oxGcfJjf/H6Vh16snh1twYTaEMrE5CTE9tSFk0vbrZsp+VTm20OL2eit49rnCiBymZJMQkEh6pxLhH9s+Uf4qmYjpr3IprtDCpNE0bgMrWNjyJVgy3+aimGE2etluWJF73Y631NvryqDKqNgU2BB6E/hXAwAk1YApofcjUfLrUrHCo5D+f8aOSsrH7Kc/RTvEPY6YjZ8kT3BhUywsDqGRTYHuLEgjse4uPO0bXT2NvYc/4k/WvVmLhDqysLhgQR6HSvNG8myfsuKmg1Cq/kv+oRmXXrYG3yqq9EZR8m/eHSsNnYUXsOCnT073qx4Qgs5BuM1vmoAYfI6e4NQ+7qKMHDHcgCJQbaHl0PSprCqiqFjACgWAHSsjY3kb9Iw7W/gKgNmYwHF4qPqrxn/NEn5VKia88v7JUf9xT/ADrOt3sYTtfaR6Axj/KoT/y1B+WXj4RqWCRdSdTf6aUjvFseLFwNDKLqdQeRVhyYHoapezt8B9pnguAUZbeoKIf4k1YG2yxH5VWEkYljbKL407RjXBQYSRg+Jzq4P3xGqsvEPYtoLdde1Zhuhsn7Ti44/u3zP+6uv4mwrXPE7dr7fBHLDbjRtYDXzq/MadQbN8j3qpbP2ViNjwPPNEBNK4ihuQw5XLWBvYC51A1sOtbk/rrswoVLfRsmAXhIMulh+FU3CeLUYnkSeO0Ycqjp5tAbXZTqb2vcd+XWsix+8+NmvnxUxBPIOVX6LYU2CuFBdGFxdWtow/rrRjio6YSly8G9x+IWCd2tMQugsy2B/aFxe9dzbTwOIshmia+iq1jqdLDkQT6Gsa2Du1isU4SKIi/3nBRBb1I1+QNWWfwv2gvwmB/Z2H/iQVTgvEjcZpaaLljNwIJbmKZkPYeZb8j5Tqvtc1EN4YS9MSnpdSPn7dK73X3f2lhnZphdCNbTE2Pe1vr6VYcdiZ2jyxvEjA882bpqLDv3pfJJaKd7TIzdncLhOzYorILEKuuXUEXIPXlUDvhuc+ETjQzF48wXKf7wE8rW+Iae9P8AD7L2nnzfao9bkg5yOemmW401Ivp0vVli2XJJk+0OsuRs6pltGD8Bz5vj0ZrHTU8qSySux9bsyXg4r/hTf/bf8qFbx/slf1U/H86FU+VmebPMO8UifaJEiFo42KIPRTa57k2vf1qLLUchN9efM/PW9cUjhoOhQoUAC9AmgRSzxBWtzBAI1vowBFzYd7UDPVWxNtQtBAWxEd3hiYZnVXbMim5Unmb06VgC5BFgb15HAGunOpvdbeabBswR24TgrLGDoQQRnUHQOvMHuADpU+PorGe9nqHim/p00JvSckp+Xsb/AIHSozY201xUSsjZZEsGW98pKhgCOqspVgezA05baKrfikRlQWbMbLlGpa/alZah4sN/i5dvzrKPGbd0tbFxj4FySj9gXKt8iSPmKTj8XS2JdMi8DPlicXUlbkBnBuddD0qc3s2kJMFM1wRwnNunKsSnxdCSUkyJ8L95pXThtJ8IAQWXpzF7X5VqCYhiAQb37D8qxvwdwSMJnZTfMFU62+G/l6Bteda+Mfw8LG1xmaNMturFRy71lxdt3oadpa2RWyJW4mJZyf71ufYAD+VZ1sqR8PPtKWZcrNKWF7fBdmU3How/oVqGEwXkWIEkm2cnmf1ifU/zqneM2zXGHeWEdBxlA8wjvbieoBNj2Bv3rEYNqjTkk7Ml2NjZGxZmuLlizXNrgnRR3PIAVsWExt4721tf+vpWHYKXhlGP66sfZWBP8K18T/oQy8i6KP3bf61vLp6Fgdp2PU2o8Ru1wP1hqo9x9331qm+J22mmnhjvdVjB8uovIx1uNNcoFXuFAwHtVHlwUb7SlgC2XJHLZerxkELYdCZAT7UoypWbmr0Q+ytkhm+ztGTO0gCoAfhBOZ79FsDqe1apvVszDJhQmQNw4TYZTfyjQWtfmKW2LsDCTzztIgkdHWEkknJwURSq9hnDMR1JqxY3AxMOG6eRdRe4Ggve/bSpSXLZpfXRUvD/AG0HwMcjWDRFo215cM2Fyf2bfWp99+9nXscZCD++NL96xvYOzRjUmw0UrRq80ssQHwsqEeQoWW91cEai3DNQm9m5uIwBBks0TGyyLyzEE5WXmrWB7g2NibGuqCp0cs3as9AnfTZ9r/bYLf8AaJ+dV7GeJOAizZSJLEhSuoYc9D87fKvPtqO9UcTEZ0abtzxcme6wAovcaH686qzb64ssrM+YofLfna97Ej4tQOfYVXBfoKPIeulHBD+afjReP/ajjO4+rUKotvWhRwQvmn7/AEAN3rqTXr7egri1do9tK0TOKMGjZaUw+FdyFRGck2AVSxJ52AA1NACeWp7F7JaTCDFryD8Nl06BQLWPTTSw5j5kNz9oBSzYKdVFrlkKfg2p+Q0qX3TwEyTjDYhGESyQzyKQfK33SR0uOfPlU5ypWbhG2Su6vhqfJPtAhItCIgw4j9Rm1Fh6Ldj6Vc99N18DJhGMMcULBCYmyiI3XUKQQCLkWINXDEYSOVAsiK4BBFxexHIjsar+8uDWSwBOiMERTYHKt7Edr2Hzt1rnnN9nVDGukVHw/wBosmETEm98KxwmMU6NwAc0UhHeHOR+6H7CnvjbtzJhosOAM8zEs3/VplOh/aLL8gwqK8KHOHx2JwkvmE0dyTqGKMwuQeeYM1678UoRDg1wkguYplOFkJJbgEN5b/eZDZCP1crc6v5Jb4mY7JwnGmjivbO1idNBzJ19AatG15GhjmwzP5QBkN+akggX61A7I3dxOIsYIywv8fwqD+8f5Xq8bI8OnazYqQt+yug+bcz+FYyyint/8Fii60iS8IMXwsNIzm0ZlJ8xAByhdUPMG7ddD0tY1cdhu8urgiOJnCA6eXOxS3oFKj5W6VVtu7G4aQYbD+TiSi4U6BFuWcjlpcc+pFW2aLyDDp8IA4hGn+AW/H/WoyyWXjCixbON/Nb4uV9NOlqZ7y4ZWQFhe4eIqdQySDzD6op9gR1ptF5eRP11qA3v3nEBhaVyESQsbDzNeOSMadQDJf5VSM10YlHyYJj4OHI8d7hHZQe4BIB+laJuntUS4VUJGaMhSOoPNW9j+dZxNIWYs2pJJJ71wDY3HMcjyNWnDkqIY8nB2a1jN5YsKCJSSeaqurH8h6mufCn+1bUnxOWwWNSATe2Yi1z3/R1l2DwzzSBF8zNfmbaAFmJY8gFBN+wrffB/dyXC4eZpo8kkslxcg+RVAXVSdL5j86nwUVRT5HJ34D2Hu/JgcTPL9qDRTu0vD4bZgzNcnyk2GtuWulRvijtcQYUvG0vExGaJbscqBh52tfQ5bgdiak9znmm4skzEsz3U/dAHlKD9kWt+NN/FzZiybPZzo0LLID88rD6N+Fc8dyt+zpk3FUvRmO4WJCYvCg/dkJ7fGmXU+9vpW5by4GKTBTLMoa8ZJU87L5tP1WNtD0Nj0rz7u7iBFjIJCAQsinXlccr+x1+Vei9iYxZoY5ApcuoLX5ZiNRe1jY3FdD7s51/jR5cx2HWKWSPNn4bumYaBsrFcw9Da9N+J2A/jW1YnwdwuZmEs4GYkouTy3NwF8puB9dK5j8IMIRcSTEHk3EQg/SOrciHAxYynvXFXrfrw5lwS8aImSG4BvrIl+WawAYE9QBbT3qi07FQdFQoqLAmxBF9reOTyxGViuWw0JOQXtopBFT77iTYhc2DiBUd2tp0PmPWqxtWMkRS9JIlF/wBqL9G3z8qn/FW+7mbUD4OGUAAuoz2GmcDUD+Q/ZPapztNOyuKpLjRQtkeEEoAfGShR/wAOI5m+bkWHsAfepHeLbUWw7YTZ8aHEsgaaaW8jIG+FFGna9uWoNiTppRmMote3T/T5DWq7trw0w2PxAxjzSrxFTiIuWzFVCghiLroAD/Kkmm9jnHiqRD7qS7Z2pArzYpIMMG1dYxxpwreYaEAJoVvp7HWpDY2EVpsf5M0y4g59AC8RVREy3OoCi1vQ+1XdcKkEUcMSBI0GRbcgANAe/e5qM2zHFh3THZbAJwprcyj6o1upElgPSRqzKKkag+CsrOzNt8eWXAyRurx6oT5Gy2TKTfUHz8xzANTmF2NkFla8nDYZzqEHUKpN2JNrkmqJsjaP9sWd0yyS8RJSDmImjl8xuea8Jhp+qABawrUdnhuJMGtYquQiwzDW7HU2Nza37N/SpxxxuyssslGjO8DsOTD7Uj4jB2jwJDOBlzOJms1ul16dKo219qPtDHxx4liIxNkC8sq31A9Ta1/WrRvrvRLgtpzZ1Eo4a8LzZCqyKrAE2NwGDdOtZjtLaLSytLYIS2by6WPMG/f1q6iznc1R6UwWARUVUQKqgBVAsAByAFNNpbVgw4vNKidfMQD9KLwz20mMwiSFg0q+SVbfCw9D3Fj86aeKO5UWMiEiIFxIeNFkAtdXdUIkA+IAMSOotp2qSxeyjy+hrsfaMeJmeSG0nK0l/gGhVcpHYk+5vVjjjCr/AF8zRbubow4OBYYmY21Zja7sebH6cugAqs+Im8owQyXu5W69ze/IfLU+1TeNxNrIpC28u8sWGQs7D0HUnsBWJbxbcfFSF3JsPhUclH8zTLaW0JJ3LyMSTy7D0FNa6MePjt9kMmTlpdB3or0KFVJFk8P8FxcdGMxGUNILHKTlF7X7WvfuARXpfYiEJzBF9OvQX1HrevLG6+O4GLglPJZFDa28reVvwJr1Hu+g4YIYm+ttNOn8qjNfey0X9KGmx8EyK8dvgkYDkLhjnU/R7fKnOL2YJVKOisp5q9ip9xreoH/pUIJ3jnYZi8w6BsiOTG2W+q5DYkdQb96l5d6cIq5nxESD9p1X8Cb1lY0b5vspXiBuXBHCcQgRDGRoiBBz9DqeQqQ8KcaZsD8WUJJItv8AFmGvzFU/eLfQYyLEwRxz4h5JAIBGJMkQW+pN7uTzy2tVi8K93cXhIZPtMQjWR0dAzB2vYhiyr8AsF5knQ3p8aQuVs0GFtR5i1x8WnPqvp864OJjjkKlgM44liRa+gP15/I1UvFzGzQYHiwNw3WWMEqAQyNmUi9uhKnWsExm3MTI2Z55CbWvmK6dvLaqRVolJ0z0fvNt7CJh5M7qRYaDX7wFY7tvG7NkJPD1PUWU/UGqG7k6kk+5J/jXN6TxJu7GstKkid4WB/wCs/wA3+lCoK9Cn8f5Yvk/CJfBHiYWSP70LcdO+U2SYfhG3+A1Zdw98VwsTwyhimfOpXXLfnpz0OvrmYdapmzMYYpVcC9uYPJlOjKfQgkfOljkWR+ES0euUkWbKeWYdx/KtuKfZhScdo9I7Ek4mHSbNcMiyW5CzDygAi4uDUxsVyAUtYDUW7Hrr3v8AW9efNieIWLwiLGoR0QAAMD8I5KSO3Krru54sLLNGkqJBdwovnkDZiBbOAAgueZuBao8Gi7yKaNax+H4iFettOlj0NVPfubMkWEVwrSMrtr/uoCHb/M3DQd89XBHuOVvfpWQ+N2DeDLi48QRxWXDvEyr8NmcZGIuFumo7sDTSMW+ikYrbPHxaqg4YbFqAQb3sBEz9NSLaV6Fw72k91Kn0PMfXX6ivJuGxJSRJAASjq4HQlSGtp00r0VsrfLB4qMyQzqjBbvHIQjxlbENY/EoNtRcaU3HitGoy5WmZz43YcjGI5YH9GYvhykGPLKAdbE5MQmot7Vmxq++KO8UOKktC2b+0SyMbcgYcNEgVuRH6FzppyqhNVF0QfZO7l70SbPxImS5Q+WVL6On/AKhzB/kTXpfZ20YcZhhLE4aORdCOYPqOjAjl0IryVVn3E3yl2dLcXeFyOLHfn0zp2cD6jQ9CE0aiek9mYriRgn4hdW9wbH+FZb49bCvHFjFGqHhSfutqhPs1x/jFW/c7bUeIZmia6vdx9Rf2Pp6VJ77bNGIwOJiIuWhcr+8ozKf8wFZiyk406PKtFQFA1skChehRUhhnlXrXduSOSFJI+TKDz5X9B0rzJutu9LjJlRFOW/maxtYWJFxzNiNBrrW4bHmhwEJD4kCGLy3YgqvThhh8bixGVbkW1tUcktpFscLTZH74eHpx20+KzsuHMaZ7G7ZxmGWNTootlJPcsbEmpjZnhjsyAhvs7S9jKxdb30GTRT8xVS3q8XVyNHgFbMwtx3FrX6pGdb+rW9jVE2hv5tGYZZMZLa4NlKxctRrGFNUSkybcUejYkgwi5RwcPFqbeSJBoL9hflUHjd/9mw3V8bG4sLcO81/nGCBy615rmnLG7EsTqSSWJPck9dK4zd6fAXyM1TxA8TYMXg5MJDHL5mT9I1kUojhx5QSbkqBY2rLFiJ5D5nQfU1zntyoi5PM1pJIw22KcMDm301oBlH3b+5/KkqKmAvxx+ov4/nQpChRYUCn2zMQqmzjynn396Y0KAasl9p4LJZgQyt8JH9aGo0gVIbI2gqgxTC8b2uRqyEcmX8q72tslorNoyOLo6/Cw/kfSmZWjX91t68VjsLhsLhJIknVCuImk8zxCPKoZYif0rOCCG5CzXsdau+xd2ooFbM74iR/7yWduIz63sFPlVewAryxC7KwZWKsNQVJUj2I1FXnd3xPxuGASQ8dRyLMc9vVje/4H1qbiUUkXvf8A8LExOWTApFBIL5ltkjkB9FHlYa621vrWX7U3ExuHQs8auAWuI24hAUFixsLAWHv6Vor+M2HeIhoJo30NhldW7qGzArf1HcVYphHjcKpePyTRq2VuYDAEXK/yqcpuJSEFM85Ma4erTvnum2DbMrZoy2Wx+NCdQG7g62b0t71U1WMlJWicouLpgoUVCmI03wLxgGKmiPNos6ehVgGsO5DD/LW34hboQeRBH1FeavDTFmPaeGN7BnMZ9Q6lR+JFelZD5L+lZ8l4dHnrfLw6mwaGeNuLADqbWkQHkWA0I9R9KpFb7vTvhCiSwowMkfkZewK3HPmLG1YVjYxmJUWUnl29PahPwLLBR2htRgULV0BWiI8w+05o0yRyMg1vkOQnNzBZbMQexNtBSMmJdgod2YIMqBmJCLzyqD8I9BSRoUCs6JrgmgTXNMA70VChQAKFGBRgUBYVqMLR56BegAZKFFnoUC2c0VHQoNAFT2wNucMGGYZ4HPmU8wf1kPRqgaANAmi0bf3d4aieFuJA2oYcx6MOhqv1L7ubxth7owDxP8aHkfbsak9s7HgkQTYM3BHmS/mTv8qDJUpDWm7P32SOJlRjwsOMHGq888ZGWew72B+grM5FsaTNYnBS7K458ejRN9ccjQzKhVijiNiuXzRuwkhfTtYofUVnNLDEuAwDaMoVvUAhgD81FIUoR4Khznzdh0KFCtmB/sJ8uJga9ss0bX/ddT/KvU0pLRkg6ldP67V5NgazKezA/jXp1tpqsOYnkL1iTo6MKtGEb+7Jmw+Kd3IYSsWDA9+hqstKTp0q5bz7T+0uz3uudl9rdD78/wDkaqWLw2XUcv4URejOWP2bQnGtdEV1EKKStkBM0V6ImhTAKhQoUDBQp1s/Zs05KwQySsozMI0aQhb2uQoNhcjX1p4u6+OIBGBxRBJAth5bEjmB5deVK0FETehen0+xcSi5nw06roMzROq6kqNSOpUj3Bpwu62ONrYHFa2t/Z5dbi4t5ddNaVhREUKlhuvjrgfYcVci4HAluR6DLrUWykEgggg2IOhBHMEdDRYzmhQoUAHSzYawjOZP0nZtU8xXz/q8r+1I0K0IW+zG8gzL+jBJ82jWYL5D974r+wNcyQ2VGupz3sAdRY283b8qSo6QDlsEQ8q50/RBiTm8rZSF8ht5r309NaW2XjGRxla1yBqbLqevpUfRihCask8dh7vJZk/RhifNo1mCkIR8WrXHoCaaPhSIhLmSzMVyhryC2tynQevrSXOg8ZABPXlTBaFRgzmZcyXVS5OYZSAuaynq3S3fSm1ChWTQKFChQBI7C2JNi5RFAmZuZPJVH6zHoK1vbkbYfDiEyZ3y+ZhoL25AdqoPh/vR9iaQWH6S1ieVx0b0ot4d9ZJmYKgXU+YnMT6gW0/GpTTk6OnFKMI22Q8E5hc5hmR9HXv6j1HSkMZi7kqnw35nmR7dKZyOWNybk9aC1RI53LVC6muJDRx0mdTWyYVEaM0VAwUKKhSGWLcxwjTzGKaQQwhysM7YdzeWOP4kViRdwbacr1suzt7JsPK+HjwgeSKLiSZ9o4ma5JKhE4kTEtpyA+lefsNipIyTHI6EjKSjFSQeYJB1HpSr7TnJuZ5SchjuZHJyHml7/D6cqw42zVno6bfvGqP/AHPDf7tQftMjBnldkULaDWzIQdbDvzoQ784/MynAQvkeGMtHiWyFsQV4VrxEgKJI89+QYMNDavOQ2riBe2Il1AU/pH1VfhXnyFzYdKTXHSjKRLIMt8vnby3tfLrpew5dqXALN2xmKkxx8sMhQlVZotqzqgzPKjMFMWVlUxNfQel6wWf4m5/EeZueZ5nqfWu4sZIoAWR1A5AOwA5nQA+p+ppGtRVCYVChQpiDoCioVoA6KhQpMAUdFQoQDjDdfalNo/c/cX+dChWvBjyM6FChWCgKFChQADQoUKABXS0KFNCFoOvtXMH3vajoVoyI0BQoUjQVChQrIAoUKFAwUKFCmAKOioUAChQoUgP/2Q==',
        name: 'perfect night',
        artist: 'LE SSERAFIM',
        music: 'perfect night.mp3'
    },
    {
        img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQSERIUERMVFhUWGRgWFxUVFRUTFhkYFxUWFxgWFRUYHSggGhslIBcWITIhJSkrMS4xGCAzODMsNygtLisBCgoKDg0OGhAQGi8lICYtLzAwNTAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYHAf/EADoQAAIBAgQDBQYEBQQDAAAAAAABAgMRBBIhMQVBUQYiYXGBEzKRobHBQmLR8CNScrLxFJLC4RWCov/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACMRAQEAAgMBAAIBBQAAAAAAAAABAhEDITESQVEiMkJxsfD/2gAMAwEAAhEDEQA/APNwAZPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADKnBtpLduy9QPko238/ifCbxbCOnNLllVn1srP/AAQhLsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAk8Ow3tasIdXr5LV/IURgX/aPhUKcYzpppXyyXK+tmigIxymU3AJHD6yhVhKWyab8iOXHBezdbEpySyU1vUlov8A1X4hfO0VJ7W4mMlQUWnaMpJq3uyaa+5zx1NfgkZ2gm80bQjLrbbu+L6HMVIOLae6bT9CnHlLNQmOoxABokAAAAAAAAAMp02rXTV1dXVrrqgMQDONNtN8l169F4/oBgAAAAAAAAAAAAAF12ZxCpzlNwctMunK+rt1ehSpHaYHB+xpxjz3b/Nz/T0M+XLUTJtq7R42E6ClStJKcfeWqbUrd30fVao5Kc23du503aih/CjO+t7S8uTfUq+EcHqV08qtFfiei0T0T67Ecdkw2THvVOB8N9pLNJdxcte8+SPQuFqWScJ6ZYpqN76ty38UktFp9SJwahThThkT0Vu9a6d+8nbne5Y4B6yfPNJPxTa0+UWZ5ZfVZ5qDFXpym7Nu10lu7dDh8Vmzyc01Jttpq2/gehcWvKpfK8iVk0m7vW+1/TyfU53tBPLTV1Zt2jdJtK2r15/qOO6y1ppO5tzROjillT0ukla3Tkn05mrh+BlWllha9r6u3oaY0m5ZUu9e1ud9rG9kvSccrj4wBtxWGlTk4zVpLl/g1FlWdGjKclGCbb5ItKnZysoqTya7pSu4+MtPpcs+xuGklUk4PLJRyyel9XezfLY6ujTV9dPPn6oyz5LLqI28yx+DlRm4TtddL29LpftEc73Hdmo1qam5ONRxi0942yruyXg76rr4HE43BzpTcKis16prqn0L45Sku1r2b4dnzVJK6i7L+re/p9zLtWnelfo18LKxbdncVCGHjTlpLWaT0zZndZW9G7W/dzR2nr2jSllUnFtRb91y0bll5pW0+5lvfInfWmzg3CY0oZqkU5tauVmop8lyXmc/xrExlPLC2SO1tm+bRGr4+pNWnOTXRvT4Ec0mN3uq4yzu0ABdYAAAAAAAAAABO2qPWI4JVaVOqvxwjL4pM8nPVOymIzYKhreycf8AbKSt8rGfJJYrlbO4i4zh0Zx9nPaVr7rRNNvT4epmmopRirRWiSWi9CViXdt+i8l/3f5EOZzX9LTv1pU8lTwn/el919PEmRrWWm70+1/30INeGZNXs+T6NbMyw1bMk9nzXRrRojbTKbm1qldJehS8b4dTm3nWyst+ielvHn4Frh6nU04ildX8/i7tlt/plOq4fsxb2l3fa2ict/BeRaTwijXnVinay3Ti9U1JpNa7L5lX2XlavR/NJr4QlZerkjsa8e8778y/NbL00ws344TjVXNXm731WuvRdTbwjhcqrUmu4mrt7PwRH4nCSqzzRtdtpeHLbwsdf2bwrlh6bWu/9zNMsrjhNK33tbJuytlskkkllSS2S10NixkIq07+KyuSS8bJq3iaKlRUmlPn05LrJcl4mGMk7JRdnJ5E/Pf5JmCJJbpJxEclNWbcVZXerS5ardbFNxThixKavaol3G/D8D8Gn6WLWdZTpZYWs+51y20fqtiswVbLl/K7tbu330uvQfWrskvjLguEz4anGpF3jmj3tJJqUlo91/gru1XDpU6EX7SUoZ0lGWuXuuzUunKx2VOim7rn8Htr8DDjvC/bYWrBb5c0f6o95fS3qaY/1bZ/byQAHQ0AAAAAAAAAAAAAGVOVmnvZp28meicDx38ODs1Tnte1lJWu10TvquTPOT1bh3C3DBUYZe8oqduspXk0/PM16sz5J0rk2VEQ61M+1YuKUoSeRq6vra+2/Iyo11O8XbMlfT/v96o56jHJGcTROORua91+94fm/Xw8iydIezK6azPTVSfMx4jiPZ0ak+ai7eey+bRHinFvIm4p96H4o76w6p9Ph0J+GqKcU42eq16Weqa6+HgTEZzrc8UXZHgdSyqThkcE/ZOW97t+7uk8zTfQtsbBZM7aipaK7t3npl80/oXVbGQo03OpJRiubfwS6vwPOOLYuWMcsiacZSkqSd01LeSX83XzNbPu9ssbd2umo8OjVnUjUipK0FZ+Td103Lbg/C/9NF003KGZyg3ur27r/XTf48X2Z7RvDTcK6k4tpNu+eFtnZ6ta7HpM60HT9opJwtmzKzTVvmPm49J5srtUYvhMZXa08ikxdKd6dODSvNqE29F3Jxfw1t5HQ4mq9tuv6eZX4iMZ1KcbbKUvKyUV/cUqePe9/wCf9NOPw8aMacafupZX/Utcz8Xr8EYYajF9670bs1ZN/W29tOhsxlCo7rdJ7t9Ov71PlR2WhW+rzuSJ1PEWtbZbFjgsXsczGoydhathMlcuN5/2hwnssVXgtlOTX9MnmXyaK86PtnTi6vtU9Z6Zdb2jFJS8PLxV9dDnDsxu4TwABKQAAAAAAAAAAfYbrn4Hc8J7ZTg8uI/iR2zJJTj5rRPyepy/Z2jnxNJPZPN/t1Oz4pwyFbV92S2kvuuaMuTLV0rZt0GHjCcM9JqUJXaa1Wu68NeXiQanCoKWaN4tdG7fB6WOTwOIr4Gpdaxe61cJ/o/n5o66fGaFehNxmoycJXhJqMk8r01380ZdVHxnPH2mrpNc/wB3DgWVOEXs014NM1YijYaU+u1TiabvGSTdnqlu09HYjVp01mnnlTcVeTSs7LrFq0vgT8XXjSjKc3aMd39vF+Bw3GeOzrqcUko6NJ2by9ded7Xt4dBjhtpjb7EbjXGpYiSze7H3Y7L+prXX1NHB8cqVVTkm1Zp2315kEHT8zWlr3NLrtHWjVcKkXe902l6q/iW/ZLiT/wBPOhKWmaOT8vejKSfSLs3fzOQUtGv2n1RsweJlSqQqQ0lB3X76civz/HStx609Q4hVUbyb01d/De5WYSq9Zy0cuXSK2X3fi2Y16sa6pSpaQqJznFbLK1dW5PM7eKRjiL2fjp8dPucuXrXGSYLCjis0VK2kknZbq6Wq6mqpG+2qI+D7t1st1/y+evqS4Ss7/FdfHzHqk/cRfZam6lDNKMeXvS8Utl6v+1os44ZSV0Y0aWWo29ssV8HO/wBRMdIue3BdsKGXEtfki231d238Skultr4v9DoO3jvi21s4Q+ln9DnUjrxnS2N1OmWd9fsM76v4k7/w9VK8koLfvO3yWxBnGzsmn4q9vmkTNU+7+xzZiASW2+gACA+qR8ATLplmXRfMXXT5mII0n6v/AEiXw+g6k8sLRaTaevLlfkXGE47UpPJiE3+b8Xn+ZFf2eklWTbS0aV+bfJHS4nDxqK01dGPJlJdWJm8m2OIhVjdNSi/Up8Zh50Ze0pSdlfxsnupL8UfMxfDnSlelNx8H3ovwZYYeu2kppRe26ad+hjeu5U631V/2dxWGxUdaNONWK70VFJtbZotK7X0v5NzOKYejRpupOpUpxXSrUt4KMW3d+FjhcVF4WcK1NuPe00ul+XfVPVWKzjnGqmKqZ6j0XuwXuxXRdX47m2GP1NsbM5fWXGeMSry3k4JvLGTu/N2sm/oVym73MQbSSL29abWoWbvJflsn/wDV9vQ1AEoAAB0HZPiKpzyT92p3bt+7Ll6O7OsxGEex5pGVjruzPaX3aNe7vpCe++0Zc/JmOfHvtOV/K2patvp3fXn9jdHcUKeaVRQaspvvbrWMXZdX+9eUmlhHfV39F9jHSmNkjfh75dXr1WhGxEnfb5k6EG5ZI+Dk3yTey6t2fl8jlu0HHVm9nhtXezqLXXpBc/P4dSbFcb2gdsaakqc+avFq+tt723t4+JD7O0YQbqVWo2tlzNLfmk/LT1LfAcIyxz1e9Um1FJvMo5tG3/NKzfgcvxWjKFapGbu09/Dl8rGuF3Pla99LHj/GVV7tO7jzk73fh5FGAaySTUTJqaAASkAAAAAAABY8K4cqyqa2cctumt916E3DzxFHRxzxXK92vLn9TX2exlOGZSdnJrV7WWyv6s6JxTXVfvZnNyZ2Zas6XxiNhsZCptvzjJWfqmfa+BbXd+H2RqxdCS70dbeGq9OZrwHGnB2ms0evNfqZan4Tbfyp+MY1zUYO94N3vo77Wf75lYWXaHGqrWk42yqyTStfq/iVp2YTUZgALAAAAAAAADpOB9qpUqn8VJ0mkpKK1VlZSj+nRHef6iMsk6ffi1HJbTNKpe1+llF36ZmePl5wjtHUoxyJR2kou9ssmsqqdG0rpX8Ohnlj+meWP6XXafjElKpRhJOUmlUcL20VlSi93u7vq7dSNwzBZNZe+/l4L9SPwrB2/iSd7q6577ybfMyx06k+7Sso85t73/lsYXu6a4YzGNvE+KpQapNuaa1ir2ZzM52ut2/ek9d90r/UuMBwdJ3k218Lryvt9SDxyllquysmk18Lfbkbcdx38wsvtV4ANUAAAAAAAAAAAE3A8TqUtneP8r29OhCAsl9HW4Di8Kmnuy/lb+j5kTtLh45IzS717O3TX3uRU8PwzleVtF9f39iTxHENU1B82mvBL7HP8zHOfK29ztVAA6FQAAAAAAAAAAAABfUuIqcKcFfM7JxS1b2VrctL+pa08LJJZ/h+pSdlHbEXva0ZO97dCdx3jT92ktH+P9Ec2fH/AC1Fpk24/iMaXjL+Vffoc3jMXKpK8vRLZeRpk7tt7vU+G2HHMUW7AAXQAAAAAAAAAAAfYRu0lu9D4SeG1lCpFy2+l+Yvg6OhCNKkk7Wirt9XzZzWNxHtJuXLkui5Ft2gr2jGK/F3vTl8yiMuLH+6poADVAAAAAAAAAAAAAA2Yerlkn6Pye5cQpqrG3J8yjJ3CsTkmk9np5Mz5Md9z1MRK1Jxk4vdGBedoKMcsZLSWz8elvIoy2OX1NooACwAAAAAAAAAAAAAM6lVyy3fuqy8jAAAAAAAAAAAAAAAAAAAAAJGMxTqON+SS9ebI4Ak0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z',
        name: 'Crimson Strings',
        artist: 'the holitter',
        music: 'Crimson Strings.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}