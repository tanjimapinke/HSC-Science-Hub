/* =========================================================
   HSC SCIENCE HUB — PLAYLIST
   playlist.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const playlistGrid =
        document.getElementById("playlistGrid");

    const emptyPlaylist =
        document.getElementById("emptyPlaylist");

    const playlistCount =
        document.getElementById("playlistCount");



    /* =====================================================
       PLAYLIST STORAGE
    ===================================================== */

    const STORAGE_KEY =
        "hsc-playlist";


    function getPlaylist() {

        try {

            return JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function savePlaylist(playlist) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(playlist)
        );

    }



    /* =====================================================
       RENDER PLAYLIST
    ===================================================== */

    function renderPlaylist() {

        if (!playlistGrid) return;


        const playlist =
            getPlaylist();


        playlistGrid.innerHTML = "";


        if (playlistCount) {

            playlistCount.textContent =
                playlist.length;

        }


        if (playlist.length === 0) {

            if (emptyPlaylist) {

                emptyPlaylist.style.display =
                    "block";

            }

            return;

        }


        if (emptyPlaylist) {

            emptyPlaylist.style.display =
                "none";

        }


        playlist.forEach((item, index) => {

            const card =
                document.createElement("div");


            card.className =
                "playlist-card";


            card.innerHTML = `

                <div class="playlist-card-icon">

                    <i class="fa-solid ${
                        item.icon || "fa-book-open"
                    }"></i>

                </div>


                <div class="playlist-card-content">

                    <span class="playlist-subject">

                        ${
                            item.subjectName ||
                            item.subject ||
                            "HSC Science"
                        }

                    </span>


                    <h3>

                        ${
                            item.title ||
                            item.name ||
                            "Study Resource"
                        }

                    </h3>


                    ${
                        item.chapter
                        ? `
                            <p>
                                Chapter ${item.chapter}
                            </p>
                          `
                        : ""
                    }

                </div>


                <div class="playlist-card-actions">

                    ${
                        item.url
                        ? `
                            <a
                                href="${item.url}"
                                class="playlist-open"
                                aria-label="Open resource">

                                <i class="fa-solid fa-arrow-right"></i>

                            </a>
                          `
                        : ""
                    }


                    <button
                        class="playlist-remove"
                        type="button"
                        data-index="${index}"
                        aria-label="Remove from playlist">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `;


            playlistGrid.appendChild(card);

        });


        attachRemoveEvents();

    }



    /* =====================================================
       REMOVE ITEM
    ===================================================== */

    function attachRemoveEvents() {

        const removeButtons =
            document.querySelectorAll(
                ".playlist-remove"
            );


        removeButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        parseInt(
                            button.dataset.index
                        );


                    const playlist =
                        getPlaylist();


                    playlist.splice(
                        index,
                        1
                    );


                    savePlaylist(
                        playlist
                    );


                    renderPlaylist();

                }
            );

        });

    }



    /* =====================================================
       ADD TO PLAYLIST
       Global function for other pages
    ===================================================== */

    window.addToPlaylist =
        function(item) {

            if (!item) return;


            const playlist =
                getPlaylist();


            /*
             * Prevent duplicate items
             */

            const exists =
                playlist.some(existing => {

                    return (
                        existing.id &&
                        item.id &&
                        existing.id === item.id
                    );

                });


            if (exists) {

                showPlaylistMessage(
                    "Already in your playlist."
                );

                return;

            }


            /*
             * Create an ID if one doesn't exist
             */

            if (!item.id) {

                item.id =
                    `${item.subject || "resource"}-${item.title || item.name || Date.now()}`
                        .toLowerCase()
                        .replace(/\s+/g, "-");

            }


            playlist.push(item);


            savePlaylist(
                playlist
            );


            showPlaylistMessage(
                "Added to your playlist!"
            );


            renderPlaylist();

        };



    /* =====================================================
       REMOVE FROM PLAYLIST
       Global function
    ===================================================== */

    window.removeFromPlaylist =
        function(id) {

            const playlist =
                getPlaylist();


            const updated =
                playlist.filter(
                    item => item.id !== id
                );


            savePlaylist(
                updated
            );


            renderPlaylist();

        };



    /* =====================================================
       CLEAR PLAYLIST
    ===================================================== */

    const clearPlaylist =
        document.getElementById(
            "clearPlaylist"
        );


    if (clearPlaylist) {

        clearPlaylist.addEventListener(
            "click",
            () => {

                const playlist =
                    getPlaylist();


                if (playlist.length === 0) {

                    return;

                }


                const confirmed =
                    confirm(
                        "Are you sure you want to clear your playlist?"
                    );


                if (!confirmed) return;


                localStorage.removeItem(
                    STORAGE_KEY
                );


                renderPlaylist();

            }
        );

    }



    /* =====================================================
       MESSAGE
    ===================================================== */

    function showPlaylistMessage(message) {

        /*
         * Use existing toast if available
         */

        if (
            typeof window.showToast ===
            "function"
        ) {

            window.showToast(
                message
            );

            return;

        }


        /*
         * Simple fallback
         */

        const messageBox =
            document.createElement("div");


        messageBox.className =
            "playlist-message";


        messageBox.textContent =
            message;


        document.body.appendChild(
            messageBox
        );


        setTimeout(() => {

            messageBox.classList.add(
                "show"
            );

        }, 10);


        setTimeout(() => {

            messageBox.remove();

        }, 2200);

    }



    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderPlaylist();

});